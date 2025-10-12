# User Service Dockerfile
FROM node:18-alpine

# Set working dir and copy full repo so local file: deps resolve during install
WORKDIR /app
COPY . .

# Install dependencies inside the service folder (use service lockfile if present)
WORKDIR /app/services/user-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false; \
	else \
		npm install --no-audit --progress=false; \
	fi

# Build the application and remove dev dependencies in one layer
RUN npm run build && npm prune --production || true

# Expose port
EXPOSE 3001

# Run the production start for the service
CMD ["npm", "run", "start:prod"]