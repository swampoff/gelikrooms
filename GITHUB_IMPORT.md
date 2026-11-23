# GelikRooms Admin v5 import

This is a clean, source-oriented export for the new `swampoff/gelikrooms` GitHub repository. It contains app source, docs, test code and a YooKassa server prototype. The oversized visual `previews/` and sample gallery backups are intentionally omitted. Real secrets and databases are not included.

The source was previously tested locally with:

```sh
node tests/smoke.cjs
node tests/advanced.cjs
python -m pytest -q server/test_app.py
```

To start the demo UI:

```sh
python -m http.server 5173
```

**Important:** This is not production-integrated with gelikrooms.ru. Keep the default branch protected and merge only after reviewing source, infrastructure, and secrets.