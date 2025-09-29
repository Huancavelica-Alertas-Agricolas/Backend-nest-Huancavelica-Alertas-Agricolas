# 🚪 Ingress Service (API Gateway)

Punto de entrada único para todas las requests del sistema.

## 🚀 Funcionalidades

- ✅ API Gateway y enrutamiento
- ✅ Autenticación JWT
- ✅ Rate limiting
- ✅ CORS y seguridad
- ✅ Load balancing
- ✅ Métricas y logging
- ✅ Health checks

## 🛠️ Stack Tecnológico

- **Node.js + TypeScript**
- **Express.js**
- **JWT** (autenticación)
- **Redis** (rate limiting)
- **helmet** (seguridad)
- **express-rate-limit**
- **http-proxy-middleware**

## 📋 API Routes

### Públicas (Sin autenticación)
- POST /api/auth/register → Users Service
- POST /api/auth/login → Users Service
- GET /api/health → Health check
- GET /api/status → System status

### Privadas (Requieren JWT)
- GET /api/users/* → Users Service
- POST /api/alerts/* → Alerts Service
- GET /api/alerts/* → Alerts Service
- POST /api/notify/* → Notifier Service

### Admin (Requieren rol admin)
- GET /api/admin/metrics → System metrics
- POST /api/admin/alerts → Create system alerts
- GET /api/admin/users → User management

## 🔒 Middlewares de Seguridad

### JWT Authentication
\\\javascript
// middleware/auth.js
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
\\\

### Rate Limiting
\\\javascript
// middleware/rateLimiter.js
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Diferentes límites por endpoint
const authLimiter = createRateLimit(15 * 60 * 1000, 5, 'Too many auth attempts');
const apiLimiter = createRateLimit(15 * 60 * 1000, 100, 'Too many API requests');
\\\

### CORS Configuration
\\\javascript
// middleware/cors.js
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
\\\

## 🔀 Proxy Configuration

\\\javascript
// config/proxy.js
const createProxyMiddleware = require('http-proxy-middleware');

// Users Service Proxy
const usersProxy = createProxyMiddleware({
  target: process.env.USERS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/users',
    '^/api/auth': '/auth'
  },
  onError: (err, req, res) => {
    res.status(503).json({ error: 'Users service unavailable' });
  }
});

// Alerts Service Proxy
const alertsProxy = createProxyMiddleware({
  target: process.env.ALERTS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/alerts': '/alerts'
  },
  onError: (err, req, res) => {
    res.status(503).json({ error: 'Alerts service unavailable' });
  }
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

# Build para producción
npm run build

# Iniciar con PM2
npm run start:pm2
\\\

## 🔧 Variables de Entorno

\\\nv
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379

# Services URLs
USERS_SERVICE_URL=http://localhost:3001
ALERTS_SERVICE_URL=http://localhost:3002
NOTIFIER_SERVICE_URL=http://localhost:3003
LOGS_SERVICE_URL=http://localhost:3004

# Security
ALLOWED_ORIGINS=http://localhost:3000,https://cityalerts.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# SSL (Production)
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
\\\

## 📊 Health Checks

\\\javascript
// routes/health.js
app.get('/api/health', async (req, res) => {
  const services = {
    users: await checkService(process.env.USERS_SERVICE_URL),
    alerts: await checkService(process.env.ALERTS_SERVICE_URL),
    notifier: await checkService(process.env.NOTIFIER_SERVICE_URL),
    redis: await checkRedis(),
  };

  const allHealthy = Object.values(services).every(status => status === 'healthy');
  
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    services
  });
});
\\\

## 📈 Métricas

- Requests por minuto
- Latencia promedio
- Error rate por servicio
- Rate limiting hits
- Usuarios activos
- Uptime de servicios
