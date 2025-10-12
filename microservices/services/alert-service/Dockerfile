# Alert Service Dockerfile
FROM node:18-alpine


WORKDIR /app
# Copy full repo so local file deps resolve
COPY . .

# Install dependencies inside the service folder (use service lockfile if present)
WORKDIR /app/services/alert-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false; \
	else \
		npm install --no-audit --progress=false; \
	fi

# Build the application and remove dev dependencies in one layer
RUN npm run build && npm prune --production || true

# Expose port
EXPOSE 3004

# Start the service
CMD ["npm", "run", "start:prod"]