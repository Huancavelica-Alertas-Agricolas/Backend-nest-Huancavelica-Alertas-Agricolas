Backups directory

This folder contains SQL backups and schema snapshots created on 2025-10-11.

Files:
- alerts_db_<timestamp>.sql - full pg_dump of alerts_db (schema + data)
- logs_db_<timestamp>.sql - full pg_dump of logs_db
- preferences_db_<timestamp>.sql - full pg_dump of preferences_db
- users_db_<timestamp>.sql - full pg_dump of users_db
- schema_snapshot_*.sql - copies of TypeORM migration files used as schema snapshots

Restore example (Postgres):

# From host PowerShell (adjust container and paths):
# Stop services that connect to the target DB to avoid conflicts.
$container = "agro_postgres_microservices"
docker cp .\sql\backups\users_db_20251011_145746.sql $container:/tmp/users_db_20251011_145746.sql
docker exec -it $container psql -U admin -d users_db -f /tmp/users_db_20251011_145746.sql

Notes and best practices:
- Always take a full pg_dump before applying destructive migrations (DROP TABLE).
- For large datasets consider logical backups with pg_dump --format=custom and use pg_restore for parallel restores.
- Keep at least 3–7 days of backups stored off-machine (S3, GCS) and rotate with retention policy.
- Test your restore procedure in a staging environment regularly.
