FROM node:18-alpine

# Copiar todo el repo para resolver deps locales
WORKDIR /app
COPY . .

# Instalar dentro del servicio
WORKDIR /app/services/preference-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

RUN npm run build && npm prune --production || true

EXPOSE 3006

CMD ["npm", "run", "start:prod"]