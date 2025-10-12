# User Service Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy root package files so local file: dependencies (../../..) resolve
# We copy the root package.json (agro-alertas-microservices) and the service package files
COPY package*.json /tmp/root_package_files/
COPY services/user-service/package*.json ./
# Install dependencies with lockfile if present for reproducible builds
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false; \
	else \
		npm install --no-audit --progress=false; \
	fi

# Copy the rest of the repository so local file:../../.. deps are available
COPY . .

# Build the application and remove dev dependencies in one layer
WORKDIR /app/services/user-service
RUN npm run build && npm prune --production || true

# Expose port
EXPOSE 3001

# Run the production start for the service
CMD ["npm", "run", "start:prod"]