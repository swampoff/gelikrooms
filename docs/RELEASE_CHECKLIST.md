# Production readiness checklist

## Implemented in frontend demo

- [x] Consistent web and mobile shell across 13 sections
- [x] Creating and editing bookings
- [x] Conflict detection for active bookings and service blocks (client-side)
- [x] Room management and seasonal rate periods
- [x] Housekeeping tasks and check-out handoff
- [x] Guest history and optional local VIP notes
- [x] Payment/refund ledger with balance checks
- [x] Performance reporting and CSV export
- [x] Saved demo conversations and review replies
- [x] Local activity timeline, JSON backup and reset
- [x] PWA shell, manifest and app icons
- [x] JavaScript smoke and advanced client data tests

## Required before live customer operation

- [ ] Confirm real GitHub repository, staging URL and existing site stack
- [ ] Connect a database and secure APIs; remove demo personal data from localStorage
- [ ] Sign-in, multi-factor authentication and server-side role access controls
- [ ] Transacted availability checking and idempotent API operations
- [ ] Channel manager integration and verified inventory sync
- [ ] Real payment processor, refunds, chargebacks and immutable ledger
- [ ] Email/SMS messaging integration and delivery logs
- [ ] Audit records stored on server and retained according to policy
- [ ] Real apartment inventory, photos, rates and communications template
- [ ] Cross-device sync, backups and restore procedures
- [ ] Visual regression testing in actual Chrome/Safari, accessibility and keyboard QA
- [ ] Data protection, privacy, retention, legal and security review

The current deliverable is a finished **interactive frontend prototype**, not a production backend or live accommodation booking platform.