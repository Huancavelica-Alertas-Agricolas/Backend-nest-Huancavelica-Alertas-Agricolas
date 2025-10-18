Scripts de limpieza

- drop_users_duplicates.sql: dropea las tablas duplicadas en `users_db` una vez confirmada la migración de datos.

Uso sugerido:
1) Hacer backup: pg_dump
2) Revisar los archivos en `sql/etl/` y validar conteos.
3) Ejecutar `sql/etl/import_*.ps1` para importar datos a DBs propietarios.
4) Ejecutar `docker exec -e PGPASSWORD=admin agro_postgres_users psql -U admin -d users_db -f /tmp/drop_users_duplicates.sql` para dropear tablas en users_db.

Advertencia: ejecutar solo tras verificar respaldos y que los datos migrados estén correctos.
