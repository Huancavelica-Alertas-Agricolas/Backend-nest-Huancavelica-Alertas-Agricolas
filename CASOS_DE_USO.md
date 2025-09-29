# 📋 Casos de Uso - Sistema de Alertas Agrícolas Huancavelica

## 👤 Actores del Sistema

### 1. **Agricultor**
- Usuario final que recibe alertas meteorológicas
- Puede configurar sus preferencias de notificación
- Consulta información de estaciones meteorológicas

### 2. **Administrador del Sistema**
- Gestiona usuarios y permisos
- Configura estaciones meteorológicas
- Supervisa el funcionamiento del sistema

### 3. **Sistema Meteorológico Externo**
- Proporciona datos climáticos en tiempo real
- Envía lecturas de sensores meteorológicos

## 🎯 Casos de Uso Principales

### **CU-001: Registro de Usuario**
**Actor:** Agricultor
**Descripción:** El agricultor se registra en el sistema para recibir alertas
**Flujo Principal:**
1. El agricultor accede al sistema
2. Proporciona datos personales (nombre, email, teléfono, ubicación)
3. El sistema valida los datos
4. Se crea la cuenta del usuario
5. Se envía email de bienvenida

### **CU-002: Configurar Preferencias de Notificación**
**Actor:** Agricultor
**Descripción:** El usuario configura cómo y cuándo desea recibir alertas
**Flujo Principal:**
1. El usuario accede a su perfil
2. Selecciona tipos de alertas (lluvia, helada, viento, temperatura)
3. Configura umbrales de alerta
4. Elige canales de notificación (email, SMS, push)
5. Define horarios de notificación
6. El sistema guarda las preferencias

### **CU-003: Recepción de Datos Meteorológicos**
**Actor:** Sistema Meteorológico Externo
**Descripción:** El sistema recibe y procesa datos meteorológicos
**Flujo Principal:**
1. Las estaciones meteorológicas envían lecturas
2. El Weather Service valida los datos
3. Se almacenan en la base de datos
4. Se registra la actividad en logs
5. Se notifica a servicios dependientes

### **CU-004: Generación de Alertas Automáticas**
**Actor:** Sistema (automático)
**Descripción:** El sistema genera alertas basadas en condiciones meteorológicas
**Flujo Principal:**
1. El Alert Service monitorea datos meteorológicos
2. Compara con umbrales configurados
3. Identifica condiciones de riesgo
4. Genera alerta correspondiente
5. Determina usuarios afectados por ubicación
6. Envía alerta al Notification Service

### **CU-005: Envío de Notificaciones**
**Actor:** Sistema (automático)
**Descripción:** El sistema envía alertas a los usuarios
**Flujo Principal:**
1. El Notification Service recibe solicitud de alerta
2. Consulta preferencias del usuario
3. Genera contenido personalizado usando plantillas
4. Envía notificación por canal preferido (email/SMS)
5. Registra el envío en logs
6. Maneja reintentos si falla el envío

### **CU-006: Consulta de Estaciones Meteorológicas**
**Actor:** Agricultor, Administrador
**Descripción:** Consultar información de estaciones disponibles
**Flujo Principal:**
1. El usuario solicita lista de estaciones
2. El sistema filtra por ubicación/región
3. Se muestran estaciones con datos actuales
4. El usuario puede ver detalles de cada estación
5. Se muestran últimas lecturas disponibles

### **CU-007: Gestión de Usuarios (Admin)**
**Actor:** Administrador
**Descripción:** El administrador gestiona usuarios del sistema
**Flujo Principal:**
1. El admin accede al panel de administración
2. Puede listar, crear, editar o eliminar usuarios
3. Asigna roles y permisos
4. Consulta estadísticas de uso
5. Gestiona usuarios inactivos

### **CU-008: Monitoreo del Sistema**
**Actor:** Administrador
**Descripción:** Supervisar el funcionamiento del sistema
**Flujo Principal:**
1. El admin accede a logs del sistema
2. Revisa estado de microservicios
3. Consulta métricas de rendimiento
4. Identifica errores o problemas
5. Toma acciones correctivas

### **CU-009: Configuración de Alertas Personalizadas**
**Actor:** Agricultor
**Descripción:** El usuario crea alertas específicas para sus cultivos
**Flujo Principal:**
1. El usuario accede a configuración avanzada
2. Selecciona tipo de cultivo
3. Define parámetros específicos (temperatura, humedad, etc.)
4. Establece umbrales personalizados
5. Configura ubicación específica de la parcela
6. El sistema guarda la configuración

### **CU-010: Historial de Alertas**
**Actor:** Agricultor, Administrador
**Descripción:** Consultar historial de alertas enviadas
**Flujo Principal:**
1. El usuario solicita historial de alertas
2. El sistema filtra por fechas/tipo de alerta
3. Se muestran alertas pasadas con detalles
4. El usuario puede exportar el historial
5. Se muestran estadísticas de alertas

## 🔄 Casos de Uso Secundarios

### **CU-011: Recuperación de Contraseña**
- El usuario puede recuperar acceso a su cuenta via email

### **CU-012: Actualización de Perfil**
- El usuario puede modificar sus datos personales

### **CU-013: API para Terceros**
- Servicios externos pueden consultar datos via API Gateway

### **CU-014: Backup y Recuperación**
- El sistema realiza respaldos automáticos de datos

### **CU-015: Mantenimiento de Estaciones**
- Gestión del estado y calibración de estaciones meteorológicas

## 🎭 Diagramas de Casos de Uso

```
                    Sistema de Alertas Agrícolas
    
    Agricultor                          Administrador
        |                                    |
        |-- Registrarse                      |-- Gestionar Usuarios
        |-- Configurar Preferencias          |-- Monitorear Sistema  
        |-- Consultar Estaciones             |-- Gestionar Estaciones
        |-- Ver Historial de Alertas        |-- Ver Logs del Sistema
        |-- Actualizar Perfil               |-- Configurar Parámetros
        |
        |           Sistema Meteorológico
        |                    |
        |-- Recibir Alertas  |-- Enviar Datos Meteorológicos
        |                    |-- Generar Alertas Automáticas
        |                    |-- Procesar Datos Climáticos
```

## ⚡ Flujos de Integración

### **Flujo de Alerta Meteorológica:**
1. **Estación Meteorológica** → Datos → **Weather Service**
2. **Weather Service** → Procesa → **Base de Datos**
3. **Alert Service** → Evalúa → Condiciones de Riesgo
4. **Alert Service** → Genera → **Notification Service**
5. **Notification Service** → Envía → **Usuario Final**
6. **Log Service** → Registra → Toda la actividad

### **Flujo de Configuración de Usuario:**
1. **Usuario** → Configura → **API Gateway**
2. **API Gateway** → Autentica → **User Service**
3. **User Service** → Guarda → **Preference Service**
4. **Preference Service** → Confirma → **Notification Service**

Estos casos de uso cubren toda la funcionalidad de tu sistema de microservicios y aseguran una experiencia completa para los agricultores de Huancavelica. 🌾