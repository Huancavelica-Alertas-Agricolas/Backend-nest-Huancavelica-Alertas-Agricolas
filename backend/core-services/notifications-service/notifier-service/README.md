# 📢 Notifier Service

Servicio de envío de notificaciones multi-canal.

## 🚀 Funcionalidades

- ✅ Envío de SMS via Twilio
- ✅ Envío de emails via SendGrid
- ✅ Push notifications via FCM
- ✅ Cola de mensajes con Redis
- ✅ Reintentos automáticos
- ✅ Templates de mensajes
- ✅ Métricas de entrega

## 🛠️ Stack Tecnológico

- **Node.js + TypeScript**
- **Express.js**
- **Redis** (cola de mensajes)
- **Twilio** (SMS)
- **SendGrid** (Email)
- **Firebase Cloud Messaging** (Push)
- **Bull** (gestión de colas)

## 📋 API Endpoints

### Notificaciones
- POST /notify/sms - Enviar SMS
- POST /notify/email - Enviar email
- POST /notify/push - Enviar push notification
- POST /notify/bulk - Envío masivo multi-canal

### Estado y Métricas
- GET /status - Estado del servicio
- GET /metrics/sent - Métricas de envío
- GET /metrics/channels - Estadísticas por canal
- GET /queue/status - Estado de colas

### Templates
- GET /templates - Listar templates
- POST /templates - Crear template
- PUT /templates/:id - Actualizar template

## 📨 Canales de Comunicación

### 📱 SMS (Twilio)
\\\javascript
{
  to: "+1234567890",
  message: "🚨 ALERTA: Emergencia en tu zona. Mantente seguro.",
  alertId: "alert_123"
}
\\\

### 📧 Email (SendGrid)
\\\javascript
{
  to: "user@example.com",
  subject: "🚨 Alerta de Emergencia",
  template: "emergency_alert",
  data: {
    alertTitle: "Emergencia en el Centro",
    alertMessage: "Se reporta incendio en la zona...",
    location: "Centro de la Ciudad"
  }
}
\\\

### 🔔 Push (FCM)
\\\javascript
{
  tokens: ["fcm_token_1", "fcm_token_2"],
  notification: {
    title: "🚨 Alerta de Emergencia",
    body: "Emergencia reportada en tu zona"
  },
  data: {
    alertId: "alert_123",
    type: "emergency",
    action: "view_details"
  }
}
\\\

## 🔄 Procesamiento de Colas

### Cola de SMS
\\\javascript
// jobs/sms-queue.js
const smsQueue = new Bull('sms notifications', {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

smsQueue.process(async (job) => {
  const { to, message, alertId } = job.data;
  await twilioClient.messages.create({
    body: message,
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
});
\\\

### Cola de Email
\\\javascript
// jobs/email-queue.js
const emailQueue = new Bull('email notifications', {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});

emailQueue.process(async (job) => {
  const { to, subject, template, data } = job.data;
  await sendgridClient.send({
    to,
    from: 'alerts@cityalerts.com',
    subject,
    templateId: template,
    dynamicTemplateData: data,
  });
});
\\\

## 🚀 Desarrollo

\\\ash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Ejecutar tests
npm test

# Monitorear colas
npm run queue:monitor

# Limpiar colas
npm run queue:clean

# Build para producción
npm run build
\\\

## 🔧 Variables de Entorno

\\\nv
PORT=3003
NODE_ENV=development
REDIS_URL=redis://localhost:6379

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Email)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=alerts@cityalerts.com

# Firebase (Push)
FCM_SERVER_KEY=your-fcm-server-key
FCM_PROJECT_ID=your-firebase-project-id

# Templates
TEMPLATE_ENGINE=handlebars
TEMPLATE_DIR=./templates
\\\

## 📊 Métricas

- Mensajes enviados por canal
- Tasa de entrega exitosa
- Tiempo promedio de procesamiento
- Reintentos por tipo de error
- Colas en tiempo real

## 🔧 Monitoreo

- Dashboard de Bull (colas)
- Health checks
- Alertas de fallos
- Métricas en tiempo real
