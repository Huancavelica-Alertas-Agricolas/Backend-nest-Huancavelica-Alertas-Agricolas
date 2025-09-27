# 🌱 Plataforma de Alertas Tempranas para Agricultores de Huancavelica

Sistema de alertas tempranas para riesgos climáticos diseñado para proteger los cultivos de agricultores en Huancavelica mediante tecnología accesible y en tiempo real.

## 🚀 Características Principales

- **Monitoreo Climático**: Integración en tiempo real con APIs meteorológicas oficiales
- **Sistema de Alertas Inteligente**: Detección automática de condiciones de riesgo (heladas, sequías, granizadas)
- **Notificaciones Multi-canal**: SMS, Telegram y correo electrónico
- **Dashboard Interactivo**: Visualización de datos y reportes personalizados
- **Arquitectura Escalable**: Basada en microservicios para alta disponibilidad

## 🏗️ Arquitectura del Sistema

### Tecnologías Utilizadas

**Backend:**
- Python 3.9+ con FastAPI y Flask
- PostgreSQL para persistencia de datos
- Redis para mensajería asíncrona
- JWT para autenticación segura

**Frontend:**
- React.js 18.2 con TypeScript
- Tailwind CSS para diseño responsive
- Chart.js para visualización de datos

**Servicios Externos:**
- WeatherAPI.com y OpenWeatherMap para datos meteorológicos
- Twilio API para mensajería SMS
- Telegram Bot API para notificaciones push

## 📋 Requisitos del Sistema

### Prerrequisitos
- Python 3.9 o superior
- PostgreSQL 15+
- Redis 6+
- Node.js 16+
- Docker y Docker Compose (opcional)

## ⚡ Instalación Rápida

### Método 1: Docker (Recomendado)
```bash
# Clonar el repositorio
git clone https://github.com/Huancavelica-Alertas-Agricolas/Tareas-Huancavelica-AlertasAgricolas.git
cd Tareas-Huancavelica-AlertasAgricolas

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar con Docker Compose
docker-compose up --build
```

### Método 2: Instalación Manual
```bash
# Backend - Para cada microservicio
cd servicio-usuarios
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py

# Frontend
cd frontend
npm install
npm start
```

## 🔧 Configuración

### Variables de Entorno Críticas
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/alertas_agricolas
WEATHER_API_KEY=tu_clave_api_meteorologica
TWILIO_ACCOUNT_SID=tu_account_sid_twilio
JWT_SECRET_KEY=clave_secreta_para_jwt
```

## 📁 Estructura del Proyecto

```text
Tareas-Huancavelica-AlertasAgricolas/
├── backend/
│   ├── servicio-usuarios/          # Gestión de usuarios y autenticación
│   ├── servicio-alertas/           # Procesamiento de alertas climáticas
│   ├── servicio-meteorologico/     # Integración con APIs climáticas
│   ├── servicio-notificaciones/    # Envío de notificaciones multi-canal
│   └── servicio-reportes/          # Generación de reportes
├── frontend/                       # Aplicación web React
├── database/                       # Scripts de base de datos
└── docs/                           # Documentación técnica
```

### 🎯 Características de Diseño

#### Principios de Usabilidad Rural
- **Iconografía Universal**: Emojis y símbolos reconocibles
- **Alto Contraste**: Ratio mínimo 4.5:1 para WCAG 2.1 AA
- **Texto Legible**: Tamaño mínimo 16px, fuente Roboto
- **Navegación Intuitiva**: Bottom navigation con iconos claros
- **Estados Visuales**: Códigos de colores para niveles de alerta

#### Paleta de Colores
- **🔴 Crítico**: #DC2626 (Heladas severas, riesgos inmediatos)
- **🟡 Moderado**: #F59E0B (Condiciones de precaución)
- **🟢 Favorable**: #10B981 (Condiciones óptimas)
- **🔵 Informativo**: #2563EB (Datos generales y tips)

#### Responsive Design
- **Mobile First**: Optimizado para pantallas 320px-768px
- **Adaptación Progresiva**: Escalado automático para tablets y desktop
- **Touch Friendly**: Elementos táctiles optimizados para dedos
- **Conectividad Limitada**: Funcionalidad offline básica

### 📋 Cumplimiento de Requisitos

#### Requisitos Funcionales Implementados
- **RF001-RF003**: Autenticación y gestión de consentimientos ✅
- **RF004-RF007**: Dashboard y navegación principal ✅
- **RF008-RF013**: Gestión completa de alertas ✅
- **RF014-RF016**: Sistema de reportes visuales ✅
- **RF017-RF019**: Notificaciones multi-canal ✅
- **RF020-RF021**: Clasificación y gestión de sesiones ✅

#### Requisitos No Funcionales Cubiertos
- **RNF1-RNF3**: Usabilidad y accesibilidad WCAG 2.1 AA ✅
- **RNF4-RNF6**: Responsividad y rendimiento optimizado ✅
- **RNF7-RNF8**: Alta disponibilidad y confiabilidad ✅
- **RNF9-RNF10**: Seguridad con HTTPS y cifrado ✅
- **RNF11-RNF16**: Compatibilidad y eficiencia energética ✅
- **RNF17-RNF24**: Mantenibilidad y documentación completa ✅

## 🚀 Despliegue en Producción

```bash
# Construir y desplegar
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Verificar estado
docker-compose -f docker-compose.prod.yml logs
```

## 📊 Funcionalidades Implementadas

### Módulo de Gestión de Usuarios
- Autenticación segura con JWT
- Gestión de perfiles y preferencias
- Configuración de canales de notificación

### Módulo de Monitoreo Climático
- Obtención de datos meteorológicos en tiempo real
- Procesamiento de pronósticos extendidos
- Almacenamiento histórico de datos climáticos

### Módulo de Alertas Inteligentes
- Detección automática de condiciones de riesgo
- Clasificación por niveles de severidad
- Gestión de reglas de notificación

### Módulo de Notificaciones
- Envío multi-canal (SMS, Telegram, Email)
- Sistema de reintentos automáticos
- Registro de logs de entrega

## 🧪 Testing y Calidad

### Pruebas Implementadas
- **Unitarias**: Cobertura >80% en servicios críticos
- **Integración**: APIs y bases de datos
- **End-to-End**: Flujos completos de usuario
- **Performance**: Carga y estrés del sistema

### Métricas de Calidad
- **Tiempo de Respuesta**: <3s en conexión 3G
- **Disponibilidad**: 99% uptime garantizado  
- **Precisión de Alertas**: >95% de efectividad
- **Adopción de Usuario**: Meta 75% en 6 meses

## 🔒 Seguridad y Privacidad

### Medidas de Seguridad
- **Cifrado**: TLS 1.3 para todas las comunicaciones
- **Autenticación**: JWT con refresh tokens
- **Autorización**: RBAC (Role-Based Access Control)
- **Validación**: Input sanitization y rate limiting

### Cumplimiento Normativo
- **Ley de Protección de Datos Personales (Perú)**
- **GDPR compliance** para datos sensibles
- **Políticas de privacidad** transparentes
- **Consentimiento explícito** para notificaciones

## 📊 Monitoreo y Observabilidad

### Métricas del Sistema
- **Logs Estructurados**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Métricas de Performance**: Prometheus + Grafana
- **Health Checks**: Endpoints de salud para cada servicio
- **Alertas Operativas**: Notificaciones para el equipo técnico

### KPIs Principales
- **Usuarios Activos Mensuales (MAU)**
- **Tiempo Medio de Entrega de Alertas**
- **Tasa de Adopción por Distrito**
- **Satisfacción del Usuario (NPS)**

## 🌍 Impacto Social y Sostenibilidad

### Objetivos de Desarrollo Sostenible (ODS)
- **ODS 1**: Fin de la pobreza - Protección de medios de vida
- **ODS 2**: Hambre cero - Seguridad alimentaria
- **ODS 13**: Acción por el clima - Adaptación climática
- **ODS 9**: Industria, innovación e infraestructura

### Métricas de Impacto
- **Cultivos Protegidos**: Hectáreas bajo monitoreo
- **Pérdidas Evitadas**: Estimación económica de daños prevenidos
- **Familias Beneficiadas**: Número de hogares rurales atendidos
- **Conocimiento Transferido**: Capacitaciones y recursos compartidos

## 📈 Roadmap de Desarrollo

### Versión 2.0 (Q2 2025)
- **Inteligencia Artificial**: Predicciones avanzadas con ML
- **App Móvil Nativa**: iOS y Android
- **Integración IoT**: Sensores de campo
- **Marketplace**: Compra/venta directa de productos

### Versión 3.0 (Q4 2025)
- **Blockchain**: Trazabilidad de productos agrícolas
- **Realidad Aumentada**: Diagnóstico de cultivos por cámara
- **Asistente Virtual**: Chatbot con IA para consultas 24/7
- **Expansión Regional**: Cobertura a nivel nacional

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces de Interés

- [Documentación de la API](https://api.alertas-huancavelica.pe/docs)
- [Manual de usuario](https://docs.alertas-huancavelica.pe/manual)
- [Guía de instalación](https://docs.alertas-huancavelica.pe/install)
- [Portal de Capacitación](https://capacitacion.alertas-huancavelica.pe)

---

<div align="center">

**Desarrollado con ❤️ para los agricultores de Huancavelica 🌄**

[![Made in Peru](https://img.shields.io/badge/Made%20in-Peru-red.svg)](https://peru.travel)
[![For Farmers](https://img.shields.io/badge/For-Farmers-green.svg)](https://github.com)
[![Climate Action](https://img.shields.io/badge/Climate-Action-blue.svg)](https://sdgs.un.org/goals)

</div>

