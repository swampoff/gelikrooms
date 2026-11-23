# Security and production status

This repository is a **demo prototype** with a separate YooKassa server adapter. It is **not ready for production use** with real guests, bookings, employees, or payments.

- Never commit live or test YooKassa secret keys, admin bearer tokens, real guest records, payment reports, or local databases.
- Use secret-management/environment variables for the server. `.env.example` contains placeholders only.
- Do not deploy this demo as a real booking management system without a server-side booking database, role-based access, audit log, secure session management, and concurrency protection.
- Avoid caching API or personal-data responses in the PWA service worker.
- Restrict access, set HTTPS, monitor changes and review payments / webhook verification before enabling production.

Report any discovered vulnerability privately to the repository owner rather than publishing real credentials in an issue.