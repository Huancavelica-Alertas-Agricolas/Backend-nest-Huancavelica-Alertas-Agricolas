# Log Service Dockerfile
FROM node:18-alpine

# Copiamos todo el repo para resolver deps locales "file:../../.."
WORKDIR /app
COPY . .

# Instalar deps dentro del servicio
WORKDIR /app/services/log-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Build + prune en una sola capa
RUN npm run build && npm prune --production || true

# Exponer puerto
EXPOSE 3005

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]