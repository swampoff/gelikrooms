"""GelikRooms payment bridge. Independent server module, NOT wired to production CRM.

Admin API uses a strong bearer token configured in the environment. Guest confirmation
always happens on YooKassa; this module never collects card numbers.
"""
from __future__ import annotations

import base64
import hmac
import ipaddress
import json
import os
import re
import sqlite3
import urllib.error
import urllib.request
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from pydantic import BaseModel, Field

BASE_URL = "https://api.yookassa.ru/v3"
DB_PATH = Path(os.environ.get("GELIKROOMS_DB", "./gelikrooms-payments.sqlite3"))
API_TOKEN = os.environ.get("GELIKROOMS_ADMIN_API_TOKEN", "")
SHOP_ID = os.environ.get("YOOKASSA_SHOP_ID", "")
SECRET_KEY = os.environ.get("YOOKASSA_SECRET_KEY", "")
RETURN_URL = os.environ.get("GELIKROOMS_RETURN_URL", "")
ENABLE_DEMO_IMPORT = os.environ.get("GELIKROOMS_ALLOW_DEMO_IMPORT", "false").lower() == "true"
RECEIPT_VAT_CODE = os.environ.get("GELIKROOMS_RECEIPT_VAT_CODE", "")
RECEIPT_PAYMENT_MODE = os.environ.get("GELIKROOMS_RECEIPT_PAYMENT_MODE", "full_prepayment")
RECEIPT_PAYMENT_SUBJECT = os.environ.get("GELIKROOMS_RECEIPT_PAYMENT_SUBJECT", "service")
# Never assume live/test from supplied secret; merchant controls the credential mode.
WEBHOOK_NETS = [ipaddress.ip_network(v) for v in (
    "185.71.76.0/27", "185.71.77.0/27", "77.75.153.0/25", "77.75.156.11/32",
    "77.75.156.35/32", "77.75.154.128/25", "2a02:5180::/32"
)]

app = FastAPI(title="GelikRooms · YooKassa payment bridge", version="0.5.0", docs_url=None, redoc_url=None)


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def money_to_minor(value: str | int | Decimal) -> int:
    try:
        d = Decimal(str(value))
        if not d.is_finite() or d <= 0 or d.as_tuple().exponent < -2:
            raise ValueError("Некорректная сумма")
        cents = int(d * 100)
        if cents > 100_000_000_00:
            raise ValueError("Слишком большая сумма")
        return cents
    except (InvalidOperation, ValueError, TypeError):
        raise ValueError("Некорректная сумма")


def minor_to_money(value: int) -> str:
    return f"{Decimal(value) / 100:.2f}"


def minor_or_none(value) -> int | None:
    try:
        return money_to_minor(value)
    except ValueError:
        return None


@contextmanager
def connect():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(str(DB_PATH), timeout=5)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA journal_mode=WAL")
    con.execute("PRAGMA foreign_keys=ON")
    try:
        yield con
        con.commit()
    except BaseException:
        con.rollback()
        raise
    finally:
        con.close()


def init_db() -> None:
    with connect() as db:
        db.executescript("""
        CREATE TABLE IF NOT EXISTS bookings (
          booking_id TEXT PRIMARY KEY, amount_minor INTEGER NOT NULL CHECK(amount_minor > 0),
          email TEXT NOT NULL, label TEXT NOT NULL, state TEXT NOT NULL DEFAULT 'confirmed',
          created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS payments (
          payment_id TEXT PRIMARY KEY, booking_id TEXT NOT NULL REFERENCES bookings(booking_id),
          idempotence TEXT NOT NULL UNIQUE, amount_minor INTEGER NOT NULL CHECK(amount_minor>0),
          status TEXT NOT NULL, confirmation_url TEXT, receipt_status TEXT,
          created_at TEXT NOT NULL, updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS refunds (
          refund_id TEXT PRIMARY KEY, payment_id TEXT NOT NULL REFERENCES payments(payment_id),
          idempotence TEXT NOT NULL UNIQUE, amount_minor INTEGER NOT NULL CHECK(amount_minor>0),
          status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS payment_intents (
          booking_id TEXT PRIMARY KEY REFERENCES bookings(booking_id), idempotence TEXT NOT NULL,
          amount_minor INTEGER NOT NULL, created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS refund_intents (
          payment_id TEXT PRIMARY KEY REFERENCES payments(payment_id), idempotence TEXT NOT NULL,
          amount_minor INTEGER NOT NULL, created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS audit (
          id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, type TEXT NOT NULL, ref TEXT NOT NULL, details TEXT NOT NULL
        );
        """)


init_db()


def admin(authorization: str | None = Header(None)) -> None:
    if len(API_TOKEN) < 24:
        raise HTTPException(503, "Серверный административный токен не настроен")
    if not authorization or not authorization.startswith("Bearer ") or not hmac.compare_digest(authorization[7:], API_TOKEN):
        raise HTTPException(401, "Доступ только для администратора", headers={"WWW-Authenticate": "Bearer"})


def configured() -> bool:
    return bool(SHOP_ID and SECRET_KEY and RETURN_URL.startswith("https://") and len(API_TOKEN) >= 24)


def require_merchant():
    if not configured():
        raise HTTPException(503, "ЮKassa не настроена. Требуются Shop ID, секрет и HTTPS return URL.")
    if not RECEIPT_VAT_CODE:
        raise HTTPException(503, "Не настроен код ставки НДС для фискального чека")
    if not RECEIPT_VAT_CODE.isdigit() or not 1 <= int(RECEIPT_VAT_CODE) <= 12:
        raise HTTPException(503, "Некорректный код НДС")


class ProviderError(Exception):
    pass


class YooProvider:
    def request(self, method: str, path: str, body: dict | None = None, key: str | None = None) -> dict:
        if not SHOP_ID or not SECRET_KEY:
            raise ProviderError("Нет учетных данных магазина")
        raw = None if body is None else json.dumps(body, ensure_ascii=False).encode('utf-8')
        auth = base64.b64encode(f"{SHOP_ID}:{SECRET_KEY}".encode()).decode()
        headers = {"Authorization": f"Basic {auth}", "Content-Type": "application/json", "User-Agent": "GelikRooms/0.5"}
        if key:
            headers["Idempotence-Key"] = key
        req = urllib.request.Request(BASE_URL + path, data=raw, method=method, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                return json.loads(response.read(256_000))
        except (urllib.error.URLError, ValueError) as e:
            raise ProviderError("ЮKassa недоступна или вернула ошибку") from e


provider: YooProvider = YooProvider()


def rowdict(row):
    return dict(row) if row else None


def audit(db, type_, ref, details):
    db.execute("INSERT INTO audit(at,type,ref,details) VALUES(?,?,?,?)", (now(), type_, ref, details))


class DemoBooking(BaseModel):
    booking_id: str = Field(pattern=r"^[A-Za-z0-9_-]{2,64}$")
    amount_rub: str
    email: str = Field(min_length=5, max_length=200)
    label: str = Field(min_length=2, max_length=140)


class CheckoutRequest(BaseModel):
    booking_id: str = Field(pattern=r"^[A-Za-z0-9_-]{2,64}$")


class RefundRequest(BaseModel):
    amount_rub: str


@app.get('/api/health')
def health():
    # No secrets, no email addresses and no provider health probe.
    return {"service": "gelikrooms-payments", "version": "0.5.0", "configured": configured(), "demo_import": ENABLE_DEMO_IMPORT, "receipts_configured": bool(RECEIPT_VAT_CODE)}


@app.get('/api/admin/summary', dependencies=[Depends(admin)])
def summary():
    with connect() as db:
        rows = [dict(r) for r in db.execute("""SELECT b.booking_id,b.label,b.amount_minor,
          COALESCE(SUM(CASE WHEN p.status='succeeded' THEN p.amount_minor ELSE 0 END),0) AS paid_minor
          FROM bookings b LEFT JOIN payments p ON p.booking_id=b.booking_id
          GROUP BY b.booking_id ORDER BY b.created_at DESC LIMIT 100""")]
        for r in rows:
            r['refunded_minor'] = db.execute("""SELECT COALESCE(SUM(f.amount_minor),0) AS total FROM refunds f JOIN payments p
              ON f.payment_id=p.payment_id WHERE p.booking_id=? AND f.status='succeeded'""", (r['booking_id'],)).fetchone()['total']
        payments = [dict(r) for r in db.execute("SELECT payment_id,booking_id,amount_minor,status,receipt_status,created_at FROM payments ORDER BY created_at DESC LIMIT 100")]
        return {"bookings": rows, "payments": payments}


@app.post('/api/admin/bookings/demo', dependencies=[Depends(admin)])
def import_demo_booking(body: DemoBooking):
    # Separate, explicitly disabled-by-default demo bridge. Production bookings MUST be inserted by the trusted reservation backend.
    if not ENABLE_DEMO_IMPORT:
        raise HTTPException(403, "Демонстрационный импорт брони отключён")
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", body.email):
        raise HTTPException(422, "Нужен e-mail гостя для чека")
    try:
        cents = money_to_minor(body.amount_rub)
    except ValueError as e:
        raise HTTPException(422, str(e)) from e
    with connect() as db:
        old = db.execute("SELECT amount_minor FROM bookings WHERE booking_id=?", (body.booking_id,)).fetchone()
        if old:
            raise HTTPException(409, "Бронирование уже существует, не перезаписывайте денежные обязательства")
        db.execute("INSERT INTO bookings VALUES(?,?,?,?,?,?)", (body.booking_id, cents, body.email, body.label, 'confirmed', now()))
        audit(db, 'demo_booking_created', body.booking_id, f"amount_minor={cents}")
    return {"booking_id": body.booking_id, "amount_minor": cents}


def provider_payment_status(db, payment_id: str, remote: dict) -> dict:
    row = db.execute("SELECT * FROM payments WHERE payment_id=?", (payment_id,)).fetchone()
    if not row:
        raise HTTPException(404, "Платёж не зарегистрирован в GelikRooms")
    remote_amount = remote.get('amount') or {}
    if remote.get('id') != payment_id or remote_amount.get('currency') != 'RUB' or minor_or_none(remote_amount.get('value')) != row['amount_minor']:
        raise HTTPException(409, "Платёж не совпадает с записью сервера")
    if remote.get('metadata', {}).get('booking_id') != row['booking_id']:
        raise HTTPException(409, "Платёж принадлежит другому бронированию")
    status = remote.get('status', 'unknown')
    if status not in ('pending', 'succeeded', 'waiting_for_capture', 'canceled'):
        raise HTTPException(409, "Неизвестный статус ЮKassa")
    db.execute("UPDATE payments SET status=?,receipt_status=?,updated_at=? WHERE payment_id=?", (status, remote.get('receipt_registration'), now(), payment_id))
    audit(db, 'payment_reconciled', payment_id, status)
    return {"payment_id": payment_id, "status": status, "receipt_registration": remote.get('receipt_registration')}


@app.post('/api/admin/payments/checkout', dependencies=[Depends(admin)])
def create_checkout(body: CheckoutRequest):
    require_merchant()
    # Persist the exact provider idempotence key BEFORE making a network call.
    # If a timeout happens after YooKassa accepted the request, the next attempt
    # retries the SAME key and cannot create an unrelated second charge.
    with connect() as db:
        b = db.execute("SELECT * FROM bookings WHERE booking_id=?", (body.booking_id,)).fetchone()
        if not b or b['state'] == 'cancelled':
            raise HTTPException(404, "Активное бронирование не найдено на сервере")
        outstanding = db.execute("SELECT COALESCE(SUM(amount_minor),0) AS total FROM payments WHERE booking_id=? AND status IN ('pending','waiting_for_capture','succeeded')", (body.booking_id,)).fetchone()['total']
        refunded = db.execute("""SELECT COALESCE(SUM(f.amount_minor),0) AS total FROM refunds f JOIN payments p ON p.payment_id=f.payment_id
        WHERE p.booking_id=? AND f.status='succeeded'""", (body.booking_id,)).fetchone()['total']
        balance = b['amount_minor'] - outstanding + refunded
        pending = db.execute("SELECT * FROM payments WHERE booking_id=? AND status IN ('pending','waiting_for_capture') ORDER BY created_at DESC LIMIT 1", (body.booking_id,)).fetchone()
        if pending:
            return {"payment_id": pending['payment_id'], "status": pending['status'], "confirmation_url": pending['confirmation_url'], "reused": True}
        if balance <= 0:
            raise HTTPException(409, "Бронирование оплачено")
        intent = db.execute("SELECT * FROM payment_intents WHERE booking_id=?", (body.booking_id,)).fetchone()
        if intent and intent['amount_minor'] != balance:
            raise HTTPException(409, "Ожидающий платёж имеет другую сумму. Нужна ручная сверка у оператора")
        key = intent['idempotence'] if intent else str(uuid.uuid4())
        if not intent:
            db.execute("INSERT INTO payment_intents VALUES(?,?,?,?)", (body.booking_id, key, balance, now()))
        payload = {
          "amount": {"value": minor_to_money(balance), "currency": "RUB"},
          "capture": True, "confirmation": {"type": "redirect", "return_url": RETURN_URL},
          "description": f"Проживание GelikRooms, бронь {body.booking_id}"[:128],
          "metadata": {"booking_id": body.booking_id},
          "receipt": {"customer": {"email": b['email']}, "items": [{
              "description": b['label'][:128], "quantity": "1.000",
              "amount": {"value": minor_to_money(balance), "currency": "RUB"},
              "vat_code": int(RECEIPT_VAT_CODE), "payment_mode": RECEIPT_PAYMENT_MODE,
              "payment_subject": RECEIPT_PAYMENT_SUBJECT
          }]}
        }
    try:
        remote = provider.request('POST', '/payments', payload, key)
    except ProviderError as e:
        # Intent deliberately survives a timeout. Do not switch idempotence key.
        raise HTTPException(502, str(e)) from e
    payment_id = remote.get('id')
    status = remote.get('status', 'pending')
    url = (remote.get('confirmation') or {}).get('confirmation_url')
    if not payment_id or not isinstance(payment_id, str) or not re.fullmatch('[A-Za-z0-9_-]{2,96}',payment_id):
        raise HTTPException(502, "ЮKassa не вернула корректный ID платежа")
    if status not in ('pending','succeeded','waiting_for_capture','canceled'):
        raise HTTPException(502, "Некорректный статус ЮKassa")
    if url and (not isinstance(url,str) or not url.startswith('https://')):
        raise HTTPException(502, "Неверный адрес подтверждения ЮKassa")
    if (remote.get('amount') and (remote['amount'].get('currency') != 'RUB' or minor_or_none(remote['amount'].get('value')) != balance)):
        raise HTTPException(502, "Сумма в ответе ЮKassa не совпадает")
    with connect() as db:
        found = db.execute("SELECT * FROM payments WHERE payment_id=?",(payment_id,)).fetchone()
        if found:
            if found['booking_id'] != body.booking_id or found['amount_minor'] != balance:
                raise HTTPException(409,'Повторный ID платежа не соответствует брони')
            db.execute('DELETE FROM payment_intents WHERE booking_id=?',(body.booking_id,))
            return {"payment_id":payment_id,"status":found['status'],"confirmation_url":found['confirmation_url'],"reused":True}
        db.execute("INSERT INTO payments VALUES(?,?,?,?,?,?,?,?,?)", (payment_id, body.booking_id, key, balance, status, url, remote.get('receipt_registration'), now(), now()))
        db.execute("DELETE FROM payment_intents WHERE booking_id=?", (body.booking_id,))
        audit(db, 'payment_created', payment_id, f"booking={body.booking_id};amount_minor={balance}")
    return {"payment_id": payment_id, "status": status, "confirmation_url": url, "reused": False}


@app.post('/api/admin/payments/{payment_id}/reconcile', dependencies=[Depends(admin)])
def reconcile_payment(payment_id: str):
    with connect() as db:
        if not db.execute("SELECT 1 FROM payments WHERE payment_id=?", (payment_id,)).fetchone():
            raise HTTPException(404, 'Неизвестный платёж')
        try:
            remote = provider.request('GET', '/payments/' + payment_id)
        except ProviderError as e:
            raise HTTPException(502, str(e)) from e
        return provider_payment_status(db, payment_id, remote)


@app.post('/api/admin/payments/{payment_id}/refund', dependencies=[Depends(admin)])
def refund(payment_id: str, body: RefundRequest):
    require_merchant()
    try:
        amount = money_to_minor(body.amount_rub)
    except ValueError as e:
        raise HTTPException(422, str(e)) from e
    with connect() as db:
        p = db.execute('SELECT * FROM payments WHERE payment_id=?', (payment_id,)).fetchone()
        if not p:
            raise HTTPException(404, 'Неизвестный платёж')
        try:
            remote = provider.request('GET', '/payments/' + payment_id)
        except ProviderError as e:
            raise HTTPException(502, str(e)) from e
        provider_payment_status(db, payment_id, remote)
        if remote.get('status') != 'succeeded' or not remote.get('refundable', False):
            raise HTTPException(409, 'Платёж не может быть возвращён')
        already = db.execute("SELECT COALESCE(SUM(amount_minor),0) AS total FROM refunds WHERE payment_id=? AND status IN ('pending','succeeded')", (payment_id,)).fetchone()['total']
        if amount > p['amount_minor'] - already:
            raise HTTPException(409, 'Сумма возврата превышает остаток')
        intent = db.execute("SELECT * FROM refund_intents WHERE payment_id=?", (payment_id,)).fetchone()
        if intent and intent['amount_minor'] != amount:
            raise HTTPException(409, 'Есть незавершённый запрос возврата с другой суммой')
        key = intent['idempotence'] if intent else str(uuid.uuid4())
        if not intent:
            db.execute("INSERT INTO refund_intents VALUES(?,?,?,?)", (payment_id,key,amount,now()))
    try:
        res = provider.request('POST', '/refunds', {"payment_id": payment_id, "amount": {"value": minor_to_money(amount), "currency": "RUB"}}, key)
    except ProviderError as e:
        raise HTTPException(502, str(e)) from e
    if res.get('payment_id') != payment_id or minor_or_none((res.get('amount') or {}).get('value')) != amount or (res.get('amount') or {}).get('currency') != 'RUB':
        raise HTTPException(502, 'Ответ ЮKassa по возврату не совпадает с запросом')
    with connect() as db:
        refund_id = res.get('id')
        status = res.get('status')
        if not refund_id or status not in ('succeeded', 'pending', 'canceled'):
            raise HTTPException(502, 'Некорректный ответ ЮKassa')
        db.execute("INSERT OR IGNORE INTO refunds VALUES(?,?,?,?,?,?,?)", (refund_id, payment_id, key, amount, status, now(), now()))
        db.execute('DELETE FROM refund_intents WHERE payment_id=?',(payment_id,))
        audit(db, 'refund_created', refund_id, f"payment={payment_id};status={status}")
        return {"refund_id": refund_id, "status": status, "amount_minor": amount}


def ip_permitted(remote_ip: str) -> bool:
    try:
        addr = ipaddress.ip_address(remote_ip)
        return any(addr in n for n in WEBHOOK_NETS)
    except ValueError:
        return False


@app.post('/api/webhooks/yookassa')
async def webhook(request: Request):
    # Do NOT trust forwarded IP headers unless your trusted proxy manages them; reject unknown source at edge.
    # Re-query provider even if incoming IP is on the published list.
    if not ip_permitted(request.client.host if request.client else ''):
        raise HTTPException(403, 'Webhook source is not an authorized YooKassa address')
    raw = await request.body()
    if len(raw) > 128_000:
        raise HTTPException(413, 'Too large')
    try:
        payload = json.loads(raw)
    except ValueError:
        raise HTTPException(400, 'Bad JSON')
    if payload.get('type') != 'notification' or payload.get('event') not in {'payment.succeeded','payment.canceled','payment.waiting_for_capture','refund.succeeded'}:
        return {"ok": True, "ignored": True}
    object_id = payload.get('object', {}).get('id')
    if not isinstance(object_id, str) or len(object_id) > 80 or not re.fullmatch(r'[a-zA-Z0-9_-]+',object_id):
        raise HTTPException(400, 'Invalid notification object')
    with connect() as db:
        if payload['event'].startswith('payment.'):
            if not db.execute('SELECT 1 FROM payments WHERE payment_id=?', (object_id,)).fetchone():
                return {"ok": True, "ignored": True}
            try:
                remote = provider.request('GET', '/payments/' + object_id)
            except ProviderError:
                raise HTTPException(503, 'Unable to verify provider status')
            result = provider_payment_status(db, object_id, remote)
            return {"ok": True, "status": result['status']}
        r = db.execute('SELECT * FROM refunds WHERE refund_id=?', (object_id,)).fetchone()
        if not r:
            return {"ok": True, "ignored": True}
        try:
            remote = provider.request('GET', '/refunds/' + object_id)
        except ProviderError:
            raise HTTPException(503, 'Unable to verify provider refund')
        if remote.get('id') != object_id or remote.get('payment_id') != r['payment_id'] or minor_or_none((remote.get('amount') or {}).get('value')) != r['amount_minor'] or (remote.get('amount') or {}).get('currency') != 'RUB':
            raise HTTPException(409, 'Provider refund mismatch')
        status = remote.get('status')
        if status not in ('succeeded','canceled','pending'):
            raise HTTPException(409, 'Unknown refund status')
        db.execute('UPDATE refunds SET status=?,updated_at=? WHERE refund_id=?', (status,now(),object_id))
        audit(db, 'refund_reconciled', object_id, status)
        return {"ok": True, "status": status}