# Importar datos ETL en preferences_db
# Uso: powershell -File scripts\import_preferences.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
docker cp "$repoRoot\sql\etl\preferences_data.sql" agro_postgres_preferences:/tmp/preferences_data.sql
docker exec -e PGPASSWORD=admin agro_postgres_preferences psql -U admin -d preferences_db -f /tmp/preferences_data.sql
docker exec -e PGPASSWORD=admin agro_postgres_preferences psql -U admin -d preferences_db -c "SELECT COUNT(*) FROM preferencias_notificacion;"
