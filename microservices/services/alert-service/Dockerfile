# Alert Service Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias desde el contexto raíz
COPY package*.json /tmp/root_package_files/
COPY services/alert-service/package*.json ./

# Install dependencies with lockfile if present
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false; \
	else \
		npm install --no-audit --progress=false; \
	fi

# Copy full repo so local file deps resolve
COPY . .

# Build the application and remove dev dependencies in one layer
WORKDIR /app/services/alert-service
RUN npm run build && npm prune --production || true

# Expose port
EXPOSE 3004

# Start the service
CMD ["npm", "run", "start:prod"]