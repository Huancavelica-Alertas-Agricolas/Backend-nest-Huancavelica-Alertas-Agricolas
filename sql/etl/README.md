ETL and cleanup scripts

- sql/etl/: contains data-only dumps extracted from `users_db` for transfer to owner DBs.
  - alertas_data.sql
  - alert_canal_data.sql
  - logs_data.sql
  - preferences_data.sql

- sql/cleanup/drop_users_duplicates.sql: script to drop duplicated tables from users_db after verification.

Notes:
- Always backup before running the drop script.
- The extracted dumps appear to be empty for some tables (no COPY statements) — verify the data before proceeding.
