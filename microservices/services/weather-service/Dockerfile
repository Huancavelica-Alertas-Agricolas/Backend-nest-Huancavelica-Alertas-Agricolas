# Weather Service Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo dev para build)
RUN npm install

# Copiar código fuente
COPY . .

# Crear directorio de reportes
RUN mkdir -p reports

# Construir la aplicación
RUN npm run build

# Remover dependencias de desarrollo
RUN npm prune --production

# Exponer puerto
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]