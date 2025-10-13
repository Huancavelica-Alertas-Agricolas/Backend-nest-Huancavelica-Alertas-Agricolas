# Notification Service Dockerfile
FROM node:18-alpine

# El context es microservices/, copiamos el repo raíz para que funcionen deps locales
WORKDIR /app
COPY .. .

# Instalación dentro del servicio
WORKDIR /app/microservices/services/notification-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Construir y copiar templates necesarios
RUN npm run build && mkdir -p dist/templates && cp -r src/templates/* dist/templates/ && npm prune --production || true

# Exponer puerto
EXPOSE 3003

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]