# Agro-Alertas Microservices

Sistema de microservicios para monitoreo climático y alertas agrícolas.

## 🏗️ Arquitectura

```
agro-alertas-microservices/
├── shared/                      # Tipos y configuraciones compartidas
├── gateway/                     # API Gateway (Puerto 3000)
│   └── api-gateway/
├── services/                    # Microservicios
│   ├── user-service/           # Gestión de usuarios (Puerto 3001)
│   ├── weather-service/        # Servicios meteorológicos (Puerto 3002)
│   ├── notification-service/   # Notificaciones por email (Puerto 3003)
│   └── alert-service/         # Orquestador de alertas (Puerto 3004)
└── docker-compose.yml         # Orquestación de contenedores
```

## 🚀 Servicios

### API Gateway (Puerto 3000)
- **Propósito**: Punto de entrada único para todas las peticiones
- **Funcionalidades**:
  - Enrutamiento a microservicios
  - Balanceado de carga
  - Autenticación centralizada
  - Rate limiting

### User Service (Puerto 3001)
- **Propósito**: Gestión de usuarios y proyectos agrícolas
- **Base de datos**: PostgreSQL
- **Funcionalidades**:
  - CRUD de usuarios
  - CRUD de proyectos
  - Relaciones usuario-proyecto

### Weather Service (Puerto 3002)
- **Propósito**: Obtención y procesamiento de datos meteorológicos
- **API Externa**: WeatherAPI
- **Funcionalidades**:
  - Generación de reportes meteorológicos
  - Análisis de riesgos (heladas, sequías)
  - Almacenamiento de reportes en CSV

### Notification Service (Puerto 3003)
- **Propósito**: Envío de notificaciones por email
- **Dependencias**: Nodemailer, Handlebars
- **Funcionalidades**:
  - Envío de emails con plantillas
  - Notificaciones de bienvenida
  - Alertas meteorológicas

### Alert Service (Puerto 3004)
- **Propósito**: Orquestación de alertas climatológicas
- **Patrón**: Saga/Orchestrator
- **Funcionalidades**:
  - Coordinación entre Weather y Notification services
  - Generación de alertas complejas
  - Manejo de errores distribuidos

## 📦 Instalación y Ejecución

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- PostgreSQL (si no usas Docker)

### 🐳 Con Docker (Recomendado)

1. **Clonar y configurar variables de entorno**:
```bash
cd microservices
cp .env.example .env
# Editar .env con tus credenciales
```

2. **Ejecutar todos los servicios**:
```bash
docker-compose up -d
```

3. **Ver logs**:
```bash
docker-compose logs -f
```

4. **Parar servicios**:
```bash
docker-compose down
```

### 🔧 Desarrollo Local

1. **Instalar dependencias en cada servicio**:
```bash
# API Gateway
cd gateway/api-gateway && npm install

# User Service
cd ../../services/user-service && npm install

# Weather Service
cd ../weather-service && npm install

# Notification Service
cd ../notification-service && npm install

# Alert Service
cd ../alert-service && npm install
```

2. **Configurar base de datos PostgreSQL**:
```bash
# Crear base de datos
createdb agro_alertas
```

3. **Ejecutar servicios en terminales separadas**:
```bash
# Terminal 1 - User Service
cd services/user-service && npm run start:dev

# Terminal 2 - Weather Service
cd services/weather-service && npm run start:dev

# Terminal 3 - Notification Service  
cd services/notification-service && npm run start:dev

# Terminal 4 - Alert Service
cd services/alert-service && npm run start:dev

# Terminal 5 - API Gateway
cd gateway/api-gateway && npm run start:dev
```

## 🌐 Endpoints Disponibles

### API Gateway (http://localhost:3000/api)

#### Usuarios
- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario por ID

#### Meteorología
- `POST /weather/generate-report` - Generar reporte meteorológico
- `GET /weather/current` - Obtener datos meteorológicos actuales

#### Notificaciones
- `POST /notifications/email` - Enviar email personalizado
- `POST /notifications/welcome` - Enviar email de bienvenida

#### Alertas
- `POST /alerts/weather` - Generar alerta meteorológica completa
- `POST /agro-alerts/generate-weather-alert` - Endpoint legacy

## 🔧 Variables de Entorno

Crear un archivo `.env` en el directorio `microservices/`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=agro_alertas

# Weather API
API_KEY=tu_weather_api_key

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_password_app
MAIL_FROM=Agro-Alertas

# Services (para Docker)
USER_SERVICE_HOST=user-service
WEATHER_SERVICE_HOST=weather-service
NOTIFICATION_SERVICE_HOST=notification-service
ALERT_SERVICE_HOST=alert-service
```

## 🧪 Testeo de la API

### Ejemplo: Generar Alerta Meteorológica
```bash
curl -X POST http://localhost:3000/api/alerts/weather \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agricultor@example.com",
    "userName": "Juan Pérez"
  }'
```

### Ejemplo: Crear Usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "code": "AGR001",
    "location": "Huancavelica",
    "email": "maria@example.com"
  }'
```

## 🔍 Monitoreo y Logs

### Ver logs por servicio:
```bash
# API Gateway
docker-compose logs -f api-gateway

# User Service
docker-compose logs -f user-service

# Weather Service
docker-compose logs -f weather-service

# Notification Service
docker-compose logs -f notification-service

# Alert Service
docker-compose logs -f alert-service
```

### Health Checks:
- API Gateway: http://localhost:3000/api
- PostgreSQL: Incluido en docker-compose

## 🏗️ Arquitectura Técnica

### Comunicación entre Servicios
- **Protocolo**: TCP (NestJS Microservices)
- **Patrón**: Request-Response
- **Timeout**: 30 segundos por defecto

### Gestión de Errores
- Reintentos automáticos
- Circuit breaker en el API Gateway
- Logs estructurados
- Respuestas consistentes con formato `ServiceResponse`

### Escalabilidad
- Cada servicio puede escalarse independientemente
- Base de datos compartida (PostgreSQL)
- Volúmenes Docker para persistencia

## 🔄 Migración desde Monolito

Si tienes el proyecto monolítico ejecutándose:

1. **Cambiar puertos**: Los microservicios usan puertos 3000-3004
2. **Migrar datos**: Usar el mismo esquema de base de datos
3. **Actualizar clientes**: Cambiar endpoints a `/api/*`
4. **Variables de entorno**: Migrar configuración existente

## 🚀 Producción

### Recomendaciones:
- Usar Kubernetes para orquestación
- Implementar service mesh (Istio)
- Configurar load balancer externo
- Monitoring con Prometheus/Grafana
- Logs centralizados con ELK Stack

### Seguridad:
- JWT en API Gateway
- HTTPS con certificados SSL
- Secrets management
- Network policies

## 🤝 Contribución

1. Fork del repositorio
2. Crear feature branch
3. Tests para nuevas funcionalidades
4. Pull request con descripción detallada

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.