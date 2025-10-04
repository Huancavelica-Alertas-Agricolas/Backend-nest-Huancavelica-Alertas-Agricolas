# 📊 Documentación de Base de Datos - Sistema de Alertas Agrícolas

## 🗄️ **Resumen del Esquema**

El sistema utiliza **PostgreSQL** con **7 tablas principales** y **6 enumeraciones** para gestionar alertas meteorológicas para agricultores de Huancavelica.

### 📋 **Tablas del Sistema:**

| Tabla | Registros | Propósito |
|-------|-----------|-----------|
| `usuarios` | 50+ | Agricultores registrados en el sistema |
| `estaciones` | 12 | Estaciones meteorológicas de Huancavelica |
| `lecturas` | 1000+ | Datos meteorológicos históricos |
| `alertas` | 200+ | Alertas generadas para usuarios |
| `alert_canal` | 400+ | Control de envío por canal (email/SMS) |
| `preferencias_notificacion` | 150+ | Configuración de usuarios |
| `logs` | 500+ | Registro de actividades del sistema |

### 🔗 **Relaciones Principales:**

```mermaid
erDiagram
    USUARIOS ||--o{ ALERTAS : recibe
    USUARIOS ||--o{ PREFERENCIAS_NOTIFICACION : configura
    USUARIOS ||--o{ LOGS : genera
    
    ESTACIONES ||--o{ LECTURAS : produce
    ESTACIONES ||--o{ ALERTAS : origina
    
    ALERTAS ||--o{ ALERT_CANAL : envia_por
    ALERT_CANAL ||--o{ LOGS : registra
```

## 🎯 **Casos de Uso por Tabla**

### 👤 **Tabla: usuarios**
**Casos de Uso:**
- CU-001: Registro de agricultor
- CU-002: Actualización de perfil  
- CU-007: Gestión de usuarios (Admin)
- CU-012: Recuperación de contraseña

**Campos Críticos:**
- `code`: Código único del agricultor
- `email`: Para notificaciones email
- `telefono`: Para notificaciones SMS
- `ciudad`: Filtrado geográfico de alertas

### 🌡️ **Tabla: estaciones**
**Casos de Uso:**
- CU-006: Consulta de estaciones meteorológicas
- CU-015: Mantenimiento de estaciones

**Campos Críticos:**
- `latitud/longitud`: Geolocalización para alertas
- `activa`: Control de estaciones operativas

### 📊 **Tabla: lecturas**
**Casos de Uso:**
- CU-003: Recepción de datos meteorológicos
- CU-004: Generación de alertas automáticas

**Campos Críticos:**
- `temp_max/temp_min`: Alertas de temperatura
- `lluvia_mm`: Alertas de precipitación
- `velocidad_viento`: Alertas de viento fuerte

### 🚨 **Tabla: alertas**
**Casos de Uso:**
- CU-004: Generación de alertas automáticas
- CU-009: Configuración de alertas personalizadas
- CU-010: Historial de alertas

**Estados del Flujo:**
```
activa → enviada → (expirada/cancelada)
```

### 📧 **Tabla: alert_canal**
**Casos de Uso:**
- CU-005: Envío de notificaciones
- CU-008: Monitoreo del sistema

**Estados del Flujo:**
```
pendiente → enviado → entregado
         ↓
      fallido (con reintento)
```

### ⚙️ **Tabla: preferencias_notificacion**
**Casos de Uso:**
- CU-002: Configurar preferencias de notificación
- CU-009: Alertas personalizadas

**Configuraciones:**
- Canales: email, SMS, push
- Horarios: `hora_inicio` a `hora_fin`
- Días: Array JSON con días de semana

### 📝 **Tabla: logs**
**Casos de Uso:**
- CU-008: Monitoreo del sistema
- CU-014: Auditoría y debugging

**Tipos de Eventos:**
- `alerta_creada`: Nueva alerta generada
- `alerta_enviada`: Notificación exitosa
- `error_envio`: Fallo en notificación

## 🔍 **Consultas Típicas del Sistema**

### **1. Alertas Activas por Usuario:**
```sql
SELECT a.titulo, a.mensaje, a.timestamp, e.nombre as estacion
FROM alertas a
JOIN estaciones e ON a.estacion_id = e.id
WHERE a.usuario_id = ? AND a.estado = 'activa'
ORDER BY a.timestamp DESC;
```

### **2. Preferencias de Notificación:**
```sql
SELECT canal, activo, hora_inicio, hora_fin, dias_semana
FROM preferencias_notificacion
WHERE usuario_id = ? AND activo = true;
```

### **3. Lecturas Recientes por Estación:**
```sql
SELECT temp_max, temp_min, lluvia_mm, humedad, timestamp
FROM lecturas
WHERE estacion_id = ?
ORDER BY timestamp DESC
LIMIT 24; -- Últimas 24 horas
```

### **4. Estado de Envío de Alertas:**
```sql
SELECT ac.canal, ac.destinatario, ac.estado, ac.fecha_envio
FROM alert_canal ac
JOIN alertas a ON ac.alerta_id = a.id
WHERE a.id = ?;
```

## 📈 **Métricas y Estadísticas**

### **Dashboard de Administrador:**
```sql
-- Total de usuarios activos
SELECT COUNT(*) FROM usuarios WHERE activo = true;

-- Alertas enviadas hoy
SELECT COUNT(*) FROM alertas 
WHERE DATE(created_at) = CURRENT_DATE;

-- Tasa de éxito de notificaciones
SELECT 
  canal,
  COUNT(*) as total,
  COUNT(CASE WHEN estado = 'entregado' THEN 1 END) as exitosos,
  ROUND(COUNT(CASE WHEN estado = 'entregado' THEN 1 END) * 100.0 / COUNT(*), 2) as tasa_exito
FROM alert_canal
GROUP BY canal;
```

## 🚀 **Uso del DBML Generado**

### **1. Visualizar en dbdiagram.io:**
1. Ve a https://dbdiagram.io/home
2. Crea cuenta gratuita
3. Pega el contenido de `database.dbml`
4. ¡Obtienes diagrama ER automático!

### **2. Archivos Generados:**
- ✅ `database.dbml` - Esquema DBML original
- ✅ `database-documented.dbml` - Versión con documentación
- ✅ `database-schema.sql` - Script SQL de PostgreSQL

### **3. Comandos Útiles:**
```bash
# Generar DBML desde BD
db2dbml postgres 'postgresql://admin:admin@localhost:5433/agro_alertas' -o database.dbml

# Convertir DBML a SQL
dbml2sql database.dbml --postgres -o schema.sql

# Generar documentación
dbdocs build database.dbml
```

## 📊 **Próximos Pasos**

1. **Optimización:** Índices en campos de búsqueda frecuente
2. **Particionado:** Tabla `lecturas` por fecha para mejor rendimiento
3. **Archivado:** Mover alertas antiguas a tabla histórica
4. **Monitoring:** Métricas de rendimiento de consultas
5. **Backup:** Estrategia de respaldo automático

---

🌾 **Sistema desarrollado para agricultores de Huancavelica - Perú** 🇵🇪