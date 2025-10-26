# Security Features Implementation

Este documento describe las características de seguridad implementadas en el API Gateway del proyecto Huancavelica Alertas Agrícolas.

## Características Implementadas

### 1. Rate Limiting (Límite de Peticiones)

**Ubicación**: `src/config/security.config.ts`, `src/guards/custom-throttler.guard.ts`

Se ha implementado un sistema de rate limiting con diferentes límites según el tipo de endpoint:

- **Global**: 100 peticiones por minuto por IP
- **Auth endpoints** (`/auth/*`): 10 peticiones por minuto por IP (más restrictivo)
- **Data endpoints** (`/data/*`, `/weather/*`): 200 peticiones por minuto por IP (más permisivo)

**Características**:
- Excluye automáticamente endpoints de health check (`/health`, `/api/health`)
- Utiliza la IP del cliente como identificador
- Aplica diferentes límites según la ruta solicitada
- Logs automáticos cuando se exceden los límites

### 2. Security Headers con Helmet

**Ubicación**: `src/config/security.config.ts`, `src/main.ts`

Se ha configurado Helmet con headers de seguridad robustos:

- **Content Security Policy (CSP)**: Controla qué recursos pueden ser cargados
- **HSTS**: Fuerza conexiones HTTPS por 1 año
- **X-Frame-Options**: Previene clickjacking
- **X-Content-Type-Options**: Previene MIME type sniffing
- **X-XSS-Protection**: Protección básica contra XSS
- **Referrer Policy**: Controla información de referrer
- **Hidden X-Powered-By**: Oculta información del servidor

### 3. Security Monitoring

**Ubicación**: `src/interceptors/security-logging.interceptor.ts`, `src/middleware/security.middleware.ts`

#### Security Logging Interceptor
- Registra todas las peticiones HTTP con información detallada
- Logs especiales para errores 4xx y 5xx
- Alertas automáticas cuando se exceden los rate limits (HTTP 429)
- Métricas de tiempo de respuesta

#### Security Middleware
- Detecta patrones de inyección SQL en URLs
- Identifica intentos de ataques XSS
- Monitorea headers sospechosos
- Logs detallados de actividad sospechosa

### 4. CORS Configuration

**Ubicación**: `src/main.ts`

Configuración de CORS existente mejorada:
- Origen específico para localhost:3000
- Métodos HTTP limitados a los necesarios
- Credenciales habilitadas para autenticación

## Archivos Modificados/Creados

### Archivos Creados:
1. `src/config/security.config.ts` - Configuración centralizada de seguridad
2. `src/guards/custom-throttler.guard.ts` - Guard personalizado para rate limiting
3. `src/interceptors/security-logging.interceptor.ts` - Interceptor para logging de seguridad
4. `src/middleware/security.middleware.ts` - Middleware para detección de amenazas

### Archivos Modificados:
1. `src/main.ts` - Configuración mejorada de Helmet y agregado del interceptor
2. `src/app.module.ts` - Configuración del ThrottlerModule, guards y middleware

## Configuración de Producción

Para producción, considera ajustar:

1. **Rate Limits**: Ajustar según el tráfico esperado
2. **CORS Origins**: Cambiar a los dominios de producción
3. **Logging Level**: Configurar según necesidades de monitoreo
4. **CSP**: Ajustar según recursos externos necesarios

## Monitoreo y Alertas

Los logs de seguridad incluyen:
- Intentos de inyección SQL
- Patrones de XSS
- Rate limiting exceeded
- Headers sospechosos
- Errores HTTP 4xx/5xx

Todos los logs incluyen:
- IP del cliente
- User-Agent
- Timestamp
- URL solicitada
- Tiempo de respuesta

## Testing

Para probar las características de seguridad:

```bash
# Test rate limiting
for i in {1..110}; do curl http://localhost:3000/api/health; done

# Test SQL injection detection (aparecerá en logs)
curl "http://localhost:3000/api/test?id=1' OR '1'='1"

# Test XSS detection (aparecerá en logs)
curl "http://localhost:3000/api/test?name=<script>alert('xss')</script>"
```

## Próximos Pasos Recomendados

1. **WAF (Web Application Firewall)**: Implementar un WAF como CloudFlare o AWS WAF
2. **API Key Authentication**: Para clientes conocidos
3. **IP Whitelisting**: Para endpoints administrativos
4. **Monitoring Dashboard**: Integrar con herramientas como Grafana
5. **Automated Threat Response**: Bloqueo automático de IPs maliciosas