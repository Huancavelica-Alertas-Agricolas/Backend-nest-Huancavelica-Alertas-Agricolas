FROM node:18-alpine

# Copiar todo el monorepo para resolver dependencias locales correctamente
WORKDIR /app
COPY . .

# Instalar dependencias dentro del subdirectorio del servicio
WORKDIR /app/services/preference-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Build y prune
RUN npm run build && npm prune --production || true

EXPOSE 3006

CMD ["npm", "run", "start:prod"]