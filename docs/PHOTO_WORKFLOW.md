# GelikRooms Photo Workflow: from prototype to production

## Implemented v4 (local prototype)

- Browser gallery is part of apartment cards, edit room form and booking details.
- Local binary storage: IndexedDB database `gelikrooms-premium-photo-gallery-v1` with keyPath `id`. Room metadata with photo order, `coverPhotoId`, file names, caption, size and dimensions lives in the app state in localStorage.
- Multiple file selection and drop. Client-side validation, browser decoding, EXIF-stripping canvas conversion to JPEG, max side 2200 px, max 15 MB/input, up to 30 photos/apartment.
- Actions: upload, edit caption, replace in place, set cover, reorder (drag or controls), full-screen preview, delete with confirmation; cover fallback when removed.
- JSON backup schema `gelikrooms.demo.v4` embeds photo bytes as base64. Full restore validates metadata and replaces IndexedDB photo set transactionally. Note backup size scales with photo count.
- The user can import `previews/v4/sample-gallery-backup.json` as a harmless DEMO example.

## Not implemented (must be addressed to deploy on gelikrooms.ru)

This demo has **no web server photo endpoint and no production authentication**. Real photo management needs server-side storage, data access control, concurrency controls, audit and online media URLs. We must not imply the browser-local images publish to the live public site.

Suggested authenticated endpoint contracts:

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/api/admin/apartments/{apartmentId}/photos` | List ordered photos and secured image URLs |
| POST | `/api/admin/apartments/{apartmentId}/photos` | Multipart upload, virus/type/dimension validation, image transform, metadata in DB |
| PATCH | `/api/admin/apartments/{apartmentId}/photos/{photoId}` | Update caption, swap cover; optimistic revision check |
| POST | `/api/admin/apartments/{apartmentId}/photos/reorder` | Atomic array order, reject missing or duplicate IDs |
| PUT | `/api/admin/apartments/{apartmentId}/photos/{photoId}/file` | Replace binary in place, generate new variants, invalidate old CDN URLs |
| DELETE | `/api/admin/apartments/{apartmentId}/photos/{photoId}` | Confirm permission, atomically detach metadata, enqueue object cleanup; choose next cover |

Production requirements: TLS, admin RBAC, CSRF protections for cookie auth, scoped requests by property, upload rate-limits, server-side magic-byte inspection and re-encoding, thumbnail and responsive variants, S3-compatible object storage with private uploads, staging and rollback, file quotas, CDN cache-busting, audit log and cross-device data. Public booking listings must request only the selected cover and image variants. Server must validate object ownership. Consider retry/cleanup for orphan files.

## Acceptance checklist for production

- Upload photos from iOS Safari and Chrome desktop, persist after sign out and sign in on a second device.
- Change cover, order, caption, binary and delete. Verify public card and apartment page each update.
- Reject invalid image, too large file, unauthorized user, deleted property and stale revision.
- Concurrent uploads/deletions do not orphan storage; backups recover from lost storage.
- Keyboard and screen reader controls accessible; mobile hit areas at least 40 px.
- Monitoring of processing failures and CDN readiness before returning success.