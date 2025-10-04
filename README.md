# Agro-Alertas - Sistema de Microservicios para Monitoreo Climático Agrícola

Sistema moderno de microservicios para monitoreo climático y alertas agrícolas construido con NestJS.

## 🏗️ Arquitectura de Microservicios

```
agro-alertas/
├── microservices/         # Arquitectura de microservicios
│   ├── gateway/          # API Gateway (Puerto 3000)
│   ├── services/         # Microservicios independientes
│   │   ├── user-service/     # Puerto 3001
│   │   ├── weather-service/  # Puerto 3002
│   │   ├── notification-service/ # Puerto 3003
│   │   └── alert-service/    # Puerto 3004
│   └── shared/          # Tipos y configuraciones compartidas
├── docker-compose.yml    # Orquestación completa
└── README.md            # Este archivo
```

## � Servicios del Sistema

- **API Gateway (3000)**: Punto de entrada único con enrutamiento inteligente
- **User Service (3001)**: Gestión de usuarios y proyectos agrícolas
- **Weather Service (3002)**: Integración con APIs meteorológicas y análisis
- **Notification Service (3003)**: Envío de notificaciones por email
- **Alert Service (3004)**: Orquestador de alertas climáticas complejas

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# Iniciar todo el sistema
npm run start

# Ver logs en tiempo real
npm run logs

# Parar el sistema
npm run stop
```

### Desarrollo Local

```bash
# Instalar dependencias de todos los servicios
npm run install:all

# Ejecutar servicios en terminales separadas
npm run dev:user         # Terminal 1
npm run dev:weather      # Terminal 2
npm run dev:notification # Terminal 3
npm run dev:alert        # Terminal 4
npm run dev:gateway      # Terminal 5
```

## 📡 API Endpoints

Todos los endpoints están disponibles a través del API Gateway en **http://localhost:3000/api**

### 👥 Usuarios
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/:id` - Obtener usuario por ID

### 🌤️ Meteorología
- `POST /api/weather/generate-report` - Generar reporte meteorológico
- `GET /api/weather/current` - Obtener datos meteorológicos actuales

### 📧 Notificaciones
- `POST /api/notifications/email` - Enviar email personalizado
- `POST /api/notifications/welcome` - Enviar email de bienvenida

### 🚨 Alertas
- `POST /api/alerts/weather` - Generar alerta meteorológica completa
- `POST /api/agro-alerts/generate-weather-alert` - Endpoint legacy compatible

## 🔧 Configuración

1. **Configurar variables de entorno:**
```bash
cp microservices/.env.example microservices/.env
```

2. **Editar el archivo `.env` con tus credenciales:**
   - `API_KEY`: Tu clave de WeatherAPI
   - `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`: Configuración de email SMTP
   - Variables de base de datos (opcionales si usas Docker)

## 🌟 Características de la Arquitectura

| Característica | Beneficio |
|----------------|-----------|
| **Escalabilidad Independiente** | Cada servicio puede escalar según su carga |
| **Tecnologías Específicas** | Usar la mejor herramienta para cada dominio |
| **Despliegue Independiente** | Releases sin afectar otros servicios |
| **Tolerancia a Fallos** | Fallos aislados no tumban todo el sistema |
| **Equipos Especializados** | Desarrollo paralelo por dominios de negocio |
| **Mantenimiento Modular** | Código organizado y menos acoplado |

## 📊 Monitoreo y Logs

### Logs del Sistema Completo
```bash
npm run logs
```

### Logs por Servicio
```bash
npm run logs:gateway       # API Gateway
npm run logs:user         # User Service
npm run logs:weather      # Weather Service
npm run logs:notification # Notification Service
npm run logs:alert        # Alert Service
```

## 🧪 Testing de la API

### Probar Alerta Meteorológica
```bash
curl -X POST http://localhost:3000/api/alerts/weather \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "userName": "Juan Pérez"}'
```

### Crear Usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "María García", "code": "AGR001", "location": "Huancavelica", "email": "maria@example.com"}'
```

### Obtener Datos Meteorológicos
```bash
curl -X GET http://localhost:3000/api/weather/current
```

## 🔧 Comandos Útiles

```bash
# Reconstruir todos los contenedores
npm run build

# Reiniciar el sistema completo
npm run restart

# Limpiar todo (contenedores, volúmenes, imágenes)
npm run clean

# Resetear completamente el sistema
npm run reset
```

## 🎯 Estructura de Servicios

### 🌐 API Gateway
- **Puerto**: 3000
- **Función**: Enrutamiento y punto de entrada único
- **Endpoints**: `/api/*`

### 👥 User Service  
- **Puerto**: 3001
- **Función**: Gestión de usuarios y proyectos
- **Base de datos**: PostgreSQL

### 🌤️ Weather Service
- **Puerto**: 3002  
- **Función**: Datos meteorológicos y reportes
- **API Externa**: WeatherAPI

### 📧 Notification Service
- **Puerto**: 3003
- **Función**: Envío de notificaciones por email
- **Templates**: Handlebars

### 🚨 Alert Service
- **Puerto**: 3004
- **Función**: Orquestación de alertas complejas
- **Patrón**: Saga/Orchestrator

## � Desarrollo

### Calidad de Código
```bash
# Linting y formateo
npm run lint:all
npm run format:all

# Tests
npm run test:all
npm run test:cov

# Seguridad
npm audit
npm run security:scan
```

### Documentación API
- **Swagger**: `http://localhost:3000/api/docs`
- **Postman**: Colección en `/docs/postman/`

## 🚀 CI/CD

El proyecto incluye:
- ✅ GitHub Actions pipeline
- ✅ Dependabot para actualizaciones
- ✅ Análisis de seguridad automático
- ✅ Docker multi-stage builds
- ✅ Despliegue automático

## 🛡️ Seguridad

- **Rate Limiting**: 100 req/min por IP
- **CORS**: Configuración estricta
- **Validación**: DTOs con class-validator
- **Headers**: Security headers con Helmet
- **Audit**: Análisis automático de vulnerabilidades

Ver `SECURITY.md` para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Ver `CONTRIBUTING.md` para guías detalladas.

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/Huancavelica-Alertas-Agricolas/Tareas-Huancavelica-Alertas-Agricolas/issues)
- **Documentación**: `/docs` folder
- **Email**: dev@agro-alertas.com

## 📄 Licencia

MIT License - Ver archivo [LICENSE](LICENSE) para detalles.