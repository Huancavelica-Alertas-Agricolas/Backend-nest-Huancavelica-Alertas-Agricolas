# Alert Service Dockerfile
FROM node:18-alpine


WORKDIR /app
# Copy full repo so local file deps resolve
COPY . .

# Install dependencies inside the service folder (use service lockfile if present)
WORKDIR /app/services/alert-service
RUN \
	if [ -f package-lock.json ]; then \
		npm ci --prefer-offline --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	else \
		npm install --no-audit --progress=false || (echo '--- NPM INSTALL FAILED - LOGS ---' && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*.log || true; exit 1); \
	fi

# Build the application and remove dev dependencies in one layer
RUN npm run build && npm prune --production || true

# Expose port
EXPOSE 3004

# Start the service
CMD ["npm", "run", "start:prod"]