# Importar datos ETL en alerts_db
# Uso: powershell -File scripts\import_alerts.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
docker cp "$repoRoot\sql\etl\alertas_data.sql" agro_postgres_alerts:/tmp/alertas_data.sql
docker cp "$repoRoot\sql\etl\alert_canal_data.sql" agro_postgres_alerts:/tmp/alert_canal_data.sql

# Ejecutar import (asume esquema ya creado por migraciones)
docker exec -e PGPASSWORD=admin agro_postgres_alerts psql -U admin -d alerts_db -f /tmp/alertas_data.sql
docker exec -e PGPASSWORD=admin agro_postgres_alerts psql -U admin -d alerts_db -f /tmp/alert_canal_data.sql

# Verificar counts
docker exec -e PGPASSWORD=admin agro_postgres_alerts psql -U admin -d alerts_db -c "SELECT COUNT(*) FROM alerts;"
docker exec -e PGPASSWORD=admin agro_postgres_alerts psql -U admin -d alerts_db -c "SELECT COUNT(*) FROM alert_channels;"
