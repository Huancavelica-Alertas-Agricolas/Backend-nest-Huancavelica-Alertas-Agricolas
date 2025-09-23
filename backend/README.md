# 🚨 City Alerts Backend - Monorepo

Sistema de alertas urbanas basado en microservicios para notificaciones ciudadanas en tiempo real.

## 📋 Descripción General

**City Alerts Backend** es un sistema distribuido diseñado para gestionar alertas urbanas (emergencias, clima, tráfico, eventos) y notificar a los ciudadanos a través de múltiples canales de comunicación.

## 🏗️ Arquitectura de Microservicios

`mermaid
graph TB
    %% Frontend y clientes
    Client[🌐 Aplicaciones Cliente<br/>Web, Mobile, IoT]
    
    %% API Gateway
    Gateway[🚪 Ingress Service<br/>API Gateway + Auth]
    
    %% Core Services
    Users[👥 Users Service<br/>Gestión de Usuarios]
    Alerts[⚠️ Alerts Service<br/>Gestión de Alertas]
    Notifier[📢 Notifier Service<br/>Envío de Notificaciones]
    
    %% Optional Services
    Logs[📊 Logs Service<br/>Auditoría y Métricas]
    
    %% External Services
    SMS[📱 SMS Provider<br/>Twilio/AWS SNS]
    Email[📧 Email Provider<br/>SendGrid/SES]
    Push[🔔 Push Notifications<br/>FCM/APNS]
    Weather[🌤️ Weather API<br/>OpenWeather]
    
    %% Databases
    UsersDB[(👥 Users DB<br/>PostgreSQL)]
    AlertsDB[(⚠️ Alerts DB<br/>MongoDB)]
    LogsDB[(📊 Logs DB<br/>Elasticsearch)]
    
    %% Message Queue
    Queue[📬 Message Queue<br/>Redis/RabbitMQ]
    
    %% Connections
    Client --> Gateway
    Gateway --> Users
    Gateway --> Alerts
    Gateway --> Notifier
    
    Users --> UsersDB
    Alerts --> AlertsDB
    Alerts --> Queue
    Notifier --> Queue
    Notifier --> SMS
    Notifier --> Email
    Notifier --> Push
    
    Weather --> Alerts
    
    %% Logging
    Users -.-> Logs
    Alerts -.-> Logs
    Notifier -.-> Logs
    Gateway -.-> Logs
    Logs --> LogsDB
`

## 🔄 Flujo End-to-End (E2E)

### 📝 Escenario: Creación y Envío de Alerta de Emergencia

`mermaid
sequenceDiagram
    participant Admin as 👨‍💼 Admin Dashboard
    participant Gateway as 🚪 Ingress Service
    participant Auth as 🔐 Auth Module
    participant Alerts as ⚠️ Alerts Service
    participant Users as 👥 Users Service
    participant Queue as 📬 Message Queue
    participant Notifier as 📢 Notifier Service
    participant SMS as 📱 SMS Provider
    participant Email as 📧 Email Provider
    participant Push as 🔔 Push Service
    participant Logs as 📊 Logs Service

    %% 1. Creación de Alerta
    Admin->>Gateway: POST /api/alerts
    Gateway->>Auth: Validar token JWT
    Auth-->>Gateway: ✅ Token válido
    Gateway->>Alerts: Crear alerta de emergencia
    
    %% 2. Procesamiento de Alerta
    Alerts->>Alerts: Validar datos de alerta
    Alerts->>Users: GET /users/by-location?lat=X&lng=Y
    Users-->>Alerts: Lista de usuarios afectados
    
    %% 3. Publicación en Cola
    Alerts->>Queue: Publicar evento de alerta
    Alerts-->>Gateway: ✅ Alerta creada (ID: 12345)
    Gateway-->>Admin: ✅ 201 Created
    
    %% 4. Procesamiento Asíncrono
    Queue->>Notifier: Consumir evento de alerta
    Notifier->>Notifier: Procesar lista de destinatarios
    
    %% 5. Envío Multi-canal
    par Envío SMS
        Notifier->>SMS: Enviar SMS a números móviles
        SMS-->>Notifier: ✅ SMS enviado
    and Envío Email
        Notifier->>Email: Enviar email a direcciones
        Email-->>Notifier: ✅ Email enviado
    and Push Notifications
        Notifier->>Push: Enviar push notifications
        Push-->>Notifier: ✅ Push enviado
    end
    
    %% 6. Logging y Métricas
    par Registro de Logs
        Alerts->>Logs: Log: Alerta creada
        Notifier->>Logs: Log: Notificaciones enviadas
        Logs->>Logs: Indexar en Elasticsearch
    end
    
    %% 7. Confirmación Final
    Notifier->>Queue: Publicar evento de confirmación
    Queue->>Alerts: Marcar alerta como enviada
    Alerts->>Logs: Log: Alerta completada
`

## 📁 Estructura del Proyecto

\\\
city-alerts-backend/
├── 📄 README.md                    # Este archivo
├── 📄 package.json                 # Configuración del monorepo
├── 📄 docker-compose.yml           # Orquestación local
├── 📄 .gitignore                   # Archivos ignorados
│
├── 🔧 services/                    # Microservicios
│   ├── 👥 users-service/          # Gestión de usuarios y perfiles
│   ├── ⚠️ alerts-service/          # Creación y gestión de alertas
│   ├── 📢 notifier-service/        # Envío de notificaciones
│   ├── 🚪 ingress-service/         # API Gateway y autenticación
│   └── 📊 logs-service/            # Logging y métricas (opcional)
│
├── 🤝 shared/                      # Código compartido
│   ├── 📚 types/                   # Tipos TypeScript compartidos
│   ├── 🛠️ utils/                   # Utilidades comunes
│   ├── ⚙️ config/                  # Configuraciones compartidas
│   └── 🔌 middleware/              # Middleware compartido
│
├── 🏗️ infra/                       # Infraestructura como código
│   ├── 🐳 docker/                  # Dockerfiles y configuraciones
│   ├── ☸️ kubernetes/              # Manifiestos K8s
│   ├── 🌩️ terraform/               # Infraestructura AWS/GCP
│   └── 📜 scripts/                 # Scripts de deployment
│
└── 📖 docs/                        # Documentación
    ├── 🏛️ architecture/            # Diagramas de arquitectura
    ├── 📋 api/                     # Documentación de APIs
    ├── 🚀 deployment/              # Guías de despliegue
    └── 🧪 testing/                 # Estrategias de testing
\\\

## 🚀 Servicios

### 🚪 Ingress Service (API Gateway)
- **Puerto:** 3000
- **Responsabilidades:**
  - �� Autenticación JWT
  - 🛡️ Rate limiting
  - 🔄 Enrutamiento de requests
  - 📊 Métricas de API
  - 🚫 CORS y seguridad

### 👥 Users Service
- **Puerto:** 3001
- **Responsabilidades:**
  - 👤 Registro y autenticación
  - 📍 Gestión de ubicaciones
  - ⚙️ Preferencias de notificación
  - 👥 Perfiles de usuario

### ⚠️ Alerts Service
- **Puerto:** 3002
- **Responsabilidades:**
  - 🆕 Creación de alertas
  - 🎯 Geolocalización y targeting
  - 📅 Programación de alertas
  - 📈 Estado y métricas

### 📢 Notifier Service
- **Puerto:** 3003
- **Responsabilidades:**
  - 📱 SMS via Twilio
  - 📧 Email via SendGrid
  - 🔔 Push notifications
  - 📬 Gestión de colas

### 📊 Logs Service (Opcional)
- **Puerto:** 3004
- **Responsabilidades:**
  - 📝 Agregación de logs
  - 📊 Métricas y dashboards
  - �� Búsqueda y análisis
  - ⚠️ Alertas de sistema

## 🛠️ Stack Tecnológico

### Backend
- **Node.js + TypeScript** - Runtime y tipado
- **Express.js** - Framework web
- **JWT** - Autenticación
- **PostgreSQL** - Base de datos relacional (usuarios)
- **MongoDB** - Base de datos documental (alertas)
- **Redis** - Cache y message broker
- **Elasticsearch** - Logs y búsqueda (opcional)

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación local
- **Kubernetes** - Orquestación producción
- **Terraform** - Infrastructure as Code
- **GitHub Actions** - CI/CD

### Servicios Externos
- **Twilio** - SMS
- **SendGrid** - Email
- **Firebase Cloud Messaging** - Push notifications
- **OpenWeather API** - Datos meteorológicos

## 🚀 Inicio Rápido

### Prerrequisitos
\\\ash
node >= 18.0.0
docker >= 20.0.0
docker-compose >= 2.0.0
\\\

### Instalación
\\\ash
# Clonar el repositorio
git clone https://github.com/tu-usuario/city-alerts-backend.git
cd city-alerts-backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servicios con Docker Compose
docker-compose up -d

# Ejecutar migraciones
npm run migrate

# Iniciar en modo desarrollo
npm run dev
\\\

### URLs de Desarrollo
- **API Gateway:** http://localhost:3000
- **Users Service:** http://localhost:3001
- **Alerts Service:** http://localhost:3002
- **Notifier Service:** http://localhost:3003
- **Logs Service:** http://localhost:3004

## 📊 Monitoreo y Observabilidad

\\\mermaid
graph LR
    Apps[🔧 Microservicios]
    Logs[📊 Logs Service]
    Elastic[�� Elasticsearch]
    Kibana[📈 Kibana Dashboard]
    
    Apps --> Logs
    Logs --> Elastic
    Elastic --> Kibana
\\\

## 🧪 Testing

- **Unit Tests:** Jest
- **Integration Tests:** Supertest
- **E2E Tests:** Cypress
- **Load Tests:** K6

## 📚 Documentación Adicional

- [🏛️ Arquitectura Detallada](./docs/architecture/README.md)
- [📋 Documentación de APIs](./docs/api/README.md)
- [🚀 Guía de Despliegue](./docs/deployment/README.md)
- [🧪 Estrategia de Testing](./docs/testing/README.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (\git checkout -b feature/amazing-feature\)
3. Commit tus cambios (\git commit -m 'Add amazing feature'\)
4. Push a la rama (\git push origin feature/amazing-feature\)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollador Principal** - [@Felakz](https://github.com/Felakz)

---

🚨 **City Alerts Backend** - Sistema de alertas urbanas confiable y escalable
