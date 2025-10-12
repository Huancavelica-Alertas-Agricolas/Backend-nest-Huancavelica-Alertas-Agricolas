# API Gateway Dockerfile
FROM node:18-alpine


WORKDIR /app

# Copiar archivos de dependencias desde el contexto raíz
COPY gateway/api-gateway/package*.json ./

# Instalar todas las dependencias (incluyendo dev para build)
RUN npm install

# Copiar código fuente del gateway desde el contexto raíz
COPY gateway/api-gateway/ ./

# Construir la aplicación
RUN npm run build

# Remover dependencias de desarrollo
RUN npm prune --production

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]