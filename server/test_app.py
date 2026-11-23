"""Offline integration tests with a fake provider. No network, no real payments."""
import importlib
import os
from pathlib import Path
from fastapi.testclient import TestClient


def setup(tmp_path: Path):
    os.environ['GELIKROOMS_DB'] = str(tmp_path/'payments.db')
    os.environ['GELIKROOMS_ADMIN_API_TOKEN'] = 'N' * 40
    os.environ['GELIKROOMS_ALLOW_DEMO_IMPORT'] = 'true'
    os.environ['YOOKASSA_SHOP_ID'] = 'test-shop'
    os.environ['YOOKASSA_SECRET_KEY'] = 'test-secret'
    os.environ['GELIKROOMS_RETURN_URL'] = 'https://example.com/return'
    os.environ['GELIKROOMS_RECEIPT_VAT_CODE'] = '1'
    import app
    module=importlib.reload(app)
    return module, TestClient(module.app), {'Authorization': 'Bearer '+'N'*40}


class FakeProvider:
    status='pending'
    refunded='pending'
    calls=[]
    def request(self, method, path, body=None, key=None):
        self.calls.append((method,path,body,key))
        if path=='/payments':
            assert key and len(key)>20 and body['receipt']['items'][0]['vat_code']==1
            pay_id = 'pay_01' if len([c for c in self.calls if c[1]=='/payments']) == 1 else 'pay_02'
            return {'id': pay_id, 'status':'pending', 'confirmation':{'confirmation_url':'https://yoomoney.ru/demo-confirm'},'amount':body['amount']}
        if path=='/payments/pay_01':
            return {'id':'pay_01','status':self.status,'refundable':self.status=='succeeded','amount':{'value':'6000.00','currency':'RUB'},'metadata':{'booking_id':'B-TEST1'},'receipt_registration':'succeeded'}
        if path=='/refunds':
            assert body['payment_id']=='pay_01'
            return {'id':'refund_01','payment_id':'pay_01','status':self.refunded,'amount':body['amount']}
        if path=='/refunds/refund_01':
            return {'id':'refund_01','payment_id':'pay_01','status':self.refunded,'amount':{'value':'1000.00','currency':'RUB'}}
        raise AssertionError(path)


def test_auth_and_server_flow(tmp_path):
    module,client,head=setup(tmp_path)
    stub=FakeProvider(); module.provider=stub
    assert client.get('/api/health').status_code==200
    assert client.get('/api/admin/summary').status_code==401
    bad=client.post('/api/admin/bookings/demo',headers=head,json={'booking_id':'B-TEST1','amount_rub':'6000.00','email':'invalid','label':'Номер 1'})
    assert bad.status_code==422
    b=client.post('/api/admin/bookings/demo',headers=head,json={'booking_id':'B-TEST1','amount_rub':'6000.00','email':'guest@example.com','label':'Бриз, проживание'})
    assert b.status_code==200
    bad_duplicate=client.post('/api/admin/bookings/demo',headers=head,json={'booking_id':'B-TEST1','amount_rub':'6000.00','email':'guest@example.com','label':'Бриз, проживание'})
    assert bad_duplicate.status_code==409
    paid=client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TEST1'})
    assert paid.status_code==200 and paid.json()['confirmation_url'].startswith('https://')
    duplicate=client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TEST1'})
    assert duplicate.status_code==200 and duplicate.json()['reused'] is True
    assert len([c for c in stub.calls if c[1]=='/payments'])==1
    assert client.post('/api/admin/payments/pay_01/refund',headers=head,json={'amount_rub':'1000.00'}).status_code==409
    # Spoofed notification rejected before checking provider.
    hook={'type':'notification','event':'payment.succeeded','object':{'id':'pay_01','status':'succeeded'}}
    assert client.post('/api/webhooks/yookassa',json=hook).status_code==403
    # Simulate trusted IP, but server still must fetch provider state.
    module.ip_permitted=lambda ip: True
    resp=client.post('/api/webhooks/yookassa',json=hook)
    assert resp.status_code==200 and resp.json()['status']=='pending'
    stub.status='succeeded'
    result=client.post('/api/webhooks/yookassa',json=hook)
    assert result.status_code==200 and result.json()['status']=='succeeded'
    summary=client.get('/api/admin/summary',headers=head).json()
    assert summary['payments'][0]['status']=='succeeded'
    ref=client.post('/api/admin/payments/pay_01/refund',headers=head,json={'amount_rub':'1000.00'})
    assert ref.status_code==200 and ref.json()['status']=='pending'
    assert client.post('/api/admin/payments/pay_01/refund',headers=head,json={'amount_rub':'5500.00'}).status_code==409
    stub.refunded='succeeded'
    ref_hook={'type':'notification','event':'refund.succeeded','object':{'id':'refund_01'}}
    assert client.post('/api/webhooks/yookassa',json=ref_hook).status_code==200
    result=client.get('/api/admin/summary',headers=head).json()
    assert result['bookings'][0]['refunded_minor']==100000
    assert client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TEST1'}).status_code==200
    assert client.get('/api/admin/summary',headers={'Authorization':'Bearer wrong'}).status_code==401


def test_money_validation(tmp_path):
    module,client,head=setup(tmp_path)
    for value in ('-2','NaN','0','1.001','inf','100000001.00'):
        try:
            module.money_to_minor(value)
        except ValueError:
            pass
        else:
            assert False, f'accepted {value}'
    assert module.money_to_minor('1.00') == 100
    assert module.money_to_minor('1200.25')==120025


def test_unconfigured_is_inert(tmp_path):
    module,client,head=setup(tmp_path)
    module.SECRET_KEY=''
    assert client.get('/api/health').json()['configured'] is False
    assert client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TEST1'}).status_code==503
    module.ENABLE_DEMO_IMPORT=False
    assert client.post('/api/admin/bookings/demo',headers=head,json={'booking_id':'B-TEST1','amount_rub':'100.00','email':'guest@example.com','label':'Номер 1'}).status_code==403


def test_payment_timeout_uses_same_idempotence_key(tmp_path):
    module, client, head = setup(tmp_path)
    client.post('/api/admin/bookings/demo', headers=head, json={
        'booking_id':'B-TIMEOUT','amount_rub':'300.00','email':'guest@example.com','label':'Услуга размещения'
    })
    class Flaky:
        keys=[]
        def request(self, method, path, body=None, key=None):
            self.keys.append(key)
            if len(self.keys)==1: raise module.ProviderError('timeout')
            return {'id':'pay_retry','status':'pending','amount':body['amount'],'confirmation':{'confirmation_url':'https://yoomoney.ru/demo'}}
    stub=Flaky(); module.provider=stub
    assert client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TIMEOUT'}).status_code==502
    with module.connect() as db:
        assert db.execute('SELECT COUNT(*) AS total FROM payment_intents').fetchone()['total']==1
    retry=client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-TIMEOUT'})
    assert retry.status_code==200
    assert stub.keys[0]==stub.keys[1]
    with module.connect() as db:
        assert db.execute('SELECT COUNT(*) AS total FROM payment_intents').fetchone()['total']==0


def test_receipt_settings_are_required(tmp_path):
    module, client, head=setup(tmp_path)
    client.post('/api/admin/bookings/demo',headers=head,json={'booking_id':'B-RECEIPT','amount_rub':'500.00','email':'test@example.com','label':'Проживание'})
    module.RECEIPT_VAT_CODE=''
    assert client.post('/api/admin/payments/checkout',headers=head,json={'booking_id':'B-RECEIPT'}).status_code==503