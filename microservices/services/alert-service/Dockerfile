# Alert Service Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias desde el contexto raíz
COPY services/alert-service/package*.json ./

# Instalar todas las dependencias (incluyendo dev para build)
RUN npm install

# Copiar código fuente del servicio desde el contexto raíz
COPY services/alert-service/ ./

# Construir la aplicación
RUN npm run build

# Remover dependencias de desarrollo
RUN npm prune --production

# Exponer puerto
EXPOSE 3004

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]