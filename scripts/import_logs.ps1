# Importar datos ETL en logs_db
# Uso: powershell -File scripts\import_logs.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
docker cp "$repoRoot\sql\etl\logs_data.sql" agro_postgres_logs:/tmp/logs_data.sql
docker exec -e PGPASSWORD=admin agro_postgres_logs psql -U admin -d logs_db -f /tmp/logs_data.sql
docker exec -e PGPASSWORD=admin agro_postgres_logs psql -U admin -d logs_db -c "SELECT COUNT(*) FROM logs;"
