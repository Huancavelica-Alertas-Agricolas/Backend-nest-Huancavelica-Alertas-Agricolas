# Alerts Service

## Descripción
Servicio encargado de gestionar alertas meteorológicas. Recibe datos de WeatherAPI, procesa reglas y genera alertas.

## Tareas y responsables (según sprints)
- Configuración de base de datos PostgreSQL (Juan + Anghelo)
- Conexión y almacenamiento de lecturas de WeatherAPI (Juan)
- Motor de reglas para alertas (Anghelo)
- Notificaciones por email y SMS (Juan + Anghelo)
- Endpoints REST para alertas y lecturas (Anghelo)
- Refactorización y separación de módulos (Juan)
- QA de integración y funcionamiento (Darío)

## Cómo trabajar aquí
1. Consulta el contrato JSON para la integración con WeatherAPI.
2. Implementa y documenta las reglas de alerta en el motor.
3. Agrega endpoints REST para exponer datos de alertas y lecturas.
4. Documenta cada módulo y flujo en el archivo de arquitectura.
5. Realiza pruebas unitarias en la carpeta `tests/`.

## Documentación adicional
- [Guía de ramas y flujo de trabajo](../../README.md)
- [Diagrama de arquitectura](../docs/arquitectura.md)
