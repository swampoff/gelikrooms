# GelikRooms | Предлагаемый API-контракт (черновик)

**Статус:** проектирование, не подключён к действующему сайту. Этот документ не описывает существующий API gelikrooms.ru.

## Вход и права

Администратор видит все разделы. Менеджер управляет апартаментами, бронями и подготовкой, но не финансовыми настройками. Клининг видит только свои задачи и не получает телефоны гостей или финансовые данные. Веб-сессия только через защищённые HttpOnly Secure SameSite cookies, CSRF-защита для мутаций, журнал действий. Сервер перепроверяет авторизацию для каждого запроса. Запрещено переносить доступ к данным гостей в localStorage.

## Основные ресурсы

```http
GET    /api/admin/summary?from=YYYY-MM-DD&to=YYYY-MM-DD
GET    /api/admin/properties
POST   /api/admin/properties
PATCH  /api/admin/properties/:propertyId
GET    /api/admin/bookings?from=YYYY-MM-DD&to=YYYY-MM-DD&status=confirmed
POST   /api/admin/bookings
PATCH  /api/admin/bookings/:bookingId
POST   /api/admin/bookings/:bookingId/check-in
POST   /api/admin/bookings/:bookingId/check-out
POST   /api/admin/bookings/:bookingId/cancel
GET    /api/admin/availability?propertyId=...&start=YYYY-MM-DD&end=YYYY-MM-DD
GET    /api/admin/blocks?from=YYYY-MM-DD&to=YYYY-MM-DD
POST   /api/admin/blocks
PATCH  /api/admin/blocks/:blockId
DELETE /api/admin/blocks/:blockId
GET    /api/admin/housekeeping-tasks?from=YYYY-MM-DD&to=YYYY-MM-DD
POST   /api/admin/housekeeping-tasks
PATCH  /api/admin/housekeeping-tasks/:taskId
DELETE /api/admin/housekeeping-tasks/:taskId
GET    /api/admin/guests?query=...
GET    /api/admin/payments?from=YYYY-MM-DD&to=YYYY-MM-DD
GET    /api/admin/messages
POST   /api/admin/messages/:threadId/replies
GET    /api/admin/reviews
POST   /api/admin/reviews/:reviewId/replies
GET    /api/admin/audit-events
```

`POST /bookings` и `POST /blocks` обязаны выполняться с транзакционной проверкой занятости. Клиентская проверка в прототипе не защищает от двух менеджеров, которые бронируют одни даты одновременно.

## Полуоткрытые даты

- `start` включается в интервал, `end` не включается.
- `2026-12-01` по `2026-12-03` занимает ночи 1 и 2 декабря, освобождает утро 3 декабря.
- Пересечение: `a.start < b.end && a.end > b.start`.
- Единая timezone объекта: `Europe/Moscow` для Геленджика.
- Стоимость должна учитывать тариф, сезон, скидку, уборку и налог, если применимо; пока прототип умножает количество ночей на базовую цену.

## Состояния

Брони: `pending`, `confirmed`, `checked_in`, `checked_out`, `cancelled`.

Задачи: `todo`, `in_progress`, `done`.

Платежи нельзя хранить единственным редактируемым полем `paid`. На production нужна отдельная immutable-модель `payments`, возвраты, валюты, методы оплаты, сверка и ответственный за корректировку.

## План подключения

1. Определить настоящий репозиторий, стек сайта, API и схему доступа.
2. Развернуть staging отдельно от сайта.
3. Добавить серверную авторизацию, RBAC и технические журналы.
4. Разделить front-end код на компоненты и сервис API, заменить `seed()` и `localStorage`.
5. Согласовать модель брони, каналы продаж, статусы и расчёты.
6. Проверить двойное бронирование при конкурентных запросах, отмены, возвраты и согласованность блокировок.
7. Перенести реальные данные только через безопасные миграции, затем запустить тестирование на desktop и mobile.

## V3: дополнительные ресурсы для будущего backend

```http
GET    /api/admin/rate-periods?roomId=...&from=...&to=...
POST   /api/admin/rate-periods
PATCH  /api/admin/rate-periods/:id
DELETE /api/admin/rate-periods/:id
GET    /api/admin/payments?from=...&to=...
POST   /api/admin/payments
POST   /api/admin/payments/:id/refund
GET    /api/admin/reports/performance?from=...&to=...
GET    /api/admin/reports/revenue?from=...&to=...
GET    /api/admin/guests/:id/preferences
PATCH  /api/admin/guests/:id/preferences
GET    /api/admin/audit-events?cursor=...
```

Платёжные суммы на сервере должны рассчитываться из неизменяемых транзакций и возвратов. Даты, права, повторные запросы (идемпотентность), версии тарифов, платежные события и конфликтующие бронирования требуют серверной транзакционной проверки. Клиентский `localStorage` не должен использоваться для настоящих платёжных и персональных данных.