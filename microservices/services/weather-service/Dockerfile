# Weather Service Dockerfile
FROM node:18-alpine

# El context de build ahora es microservices/; copiamos el repo raíz con ".."
WORKDIR /app
COPY .. .

# Instalamos dependencias dentro de la carpeta del servicio
WORKDIR /app/microservices/services/weather-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Crear directorio de reportes requerido por la app
RUN mkdir -p reports

# Construir y luego dejar solo prod deps en una sola capa
RUN npm run build && npm prune --production || true

# Exponer puerto
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]