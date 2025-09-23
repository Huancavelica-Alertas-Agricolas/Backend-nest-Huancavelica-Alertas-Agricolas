# ⚠️ Alerts Service

Servicio de creación, gestión y procesamiento de alertas urbanas.

## 🚀 Funcionalidades

- ✅ Creación de alertas de diferentes tipos
- ✅ Geolocalización y targeting
- ✅ Programación de alertas
- ✅ Integración con APIs externas (clima)
- ✅ Gestión de estados de alerta
- ✅ Métricas y reportes

## 🛠️ Stack Tecnológico

- **Node.js + TypeScript**
- **Express.js**
- **MongoDB**
- **Redis** (cola de mensajes)
- **OpenWeather API**
- **node-cron** (programación)

## 📋 API Endpoints

### Alertas
- POST /alerts - Crear nueva alerta
- GET /alerts - Listar alertas
- GET /alerts/:id - Obtener alerta específica
- PUT /alerts/:id - Actualizar alerta
- DELETE /alerts/:id - Eliminar alerta
- POST /alerts/:id/send - Enviar alerta manualmente

### Tipos de Alerta
- GET /alert-types - Listar tipos de alerta
- POST /alert-types - Crear tipo de alerta

### Métricas
- GET /metrics/sent - Alertas enviadas
- GET /metrics/types - Estadísticas por tipo
- GET /metrics/locations - Estadísticas por ubicación

## 🗃️ Estructura de Base de Datos (MongoDB)

\\\javascript
// Colección: alerts
{
  _id: ObjectId,
  title: String,
  message: String,
  type: String, // 'emergency', 'weather', 'traffic', 'event'
  severity: String, // 'low', 'medium', 'high', 'critical'
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  radius: Number, // Radio en metros
  targetUsers: [ObjectId], // IDs de usuarios objetivo
  scheduledAt: Date,
  sentAt: Date,
  status: String, // 'draft', 'scheduled', 'sending', 'sent', 'failed'
  metadata: {
    weatherCondition: String,
    trafficLevel: String,
    eventType: String
  },
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

// Colección: alert_types
{
  _id: ObjectId,
  name: String,
  description: String,
  defaultSeverity: String,
  template: String,
  isActive: Boolean,
  createdAt: Date
}

// Colección: alert_logs
{
  _id: ObjectId,
  alertId: ObjectId,
  userId: ObjectId,
  channel: String, // 'sms', 'email', 'push'
  status: String, // 'sent', 'failed', 'delivered'
  error: String,
  sentAt: Date
}
\\\

## 🚀 Desarrollo

\\\ash
# Instalar dependencias
npm install

# Ejecutar migraciones
npm run migrate

# Sembrar datos de prueba
npm run seed

# Modo desarrollo
npm run dev

# Ejecutar tests
npm test

# Build para producción
npm run build
\\\

## 🔧 Variables de Entorno

\\\nv
PORT=3002
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/alerts_db
REDIS_URL=redis://localhost:6379
OPENWEATHER_API_KEY=your-openweather-api-key
USERS_SERVICE_URL=http://localhost:3001
CRON_ENABLED=true
\\\

## 🌤️ Integración con APIs Externas

### OpenWeather API
- Obtención de datos meteorológicos
- Alertas automáticas por condiciones climáticas
- Predicciones y tendencias

### Google Maps API (Opcional)
- Geocodificación de direcciones
- Datos de tráfico en tiempo real

## 📊 Métricas

- Alertas creadas por tipo
- Alertas enviadas exitosamente
- Tiempo de procesamiento
- Usuarios alcanzados por ubicación
- Efectividad por canal de comunicación
