# API Gateway Dockerfile
FROM node:18-alpine

# El context es microservices/, necesitamos subir un nivel
WORKDIR /app
COPY .. .

# Instalar dentro del servicio
WORKDIR /app/microservices/gateway/api-gateway
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Build + prune
RUN npm run build && npm prune --production || true

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]