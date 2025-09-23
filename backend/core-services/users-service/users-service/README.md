# 👥 Users Service

Servicio de gestión de usuarios, autenticación y perfiles.

## 🚀 Funcionalidades

- ✅ Registro y autenticación de usuarios
- ✅ Gestión de perfiles de usuario
- ✅ Manejo de ubicaciones geográficas
- ✅ Preferencias de notificación
- ✅ Autenticación JWT
- ✅ Validación de datos

## 🛠️ Stack Tecnológico

- **Node.js + TypeScript**
- **Express.js**
- **PostgreSQL**
- **JWT**
- **bcrypt**
- **joi** (validación)

## 📋 API Endpoints

### Autenticación
- POST /auth/register - Registro de usuario
- POST /auth/login - Inicio de sesión
- POST /auth/refresh - Renovar token
- POST /auth/logout - Cerrar sesión

### Usuarios
- GET /users/profile - Obtener perfil
- PUT /users/profile - Actualizar perfil
- PUT /users/location - Actualizar ubicación
- PUT /users/preferences - Actualizar preferencias

### Búsqueda (Interno)
- GET /users/by-location - Usuarios por ubicación
- GET /users/by-preferences - Usuarios por preferencias

## 🗃️ Estructura de Base de Datos

\\\sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ubicaciones
CREATE TABLE user_locations (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

-- Tabla de preferencias
CREATE TABLE user_preferences (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sms_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  emergency_alerts BOOLEAN DEFAULT true,
  weather_alerts BOOLEAN DEFAULT false,
  traffic_alerts BOOLEAN DEFAULT false,
  event_alerts BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);
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
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/users_db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
\\\

## 📊 Métricas

- Usuarios registrados
- Sesiones activas
- Ubicaciones actualizadas
- Preferencias modificadas
