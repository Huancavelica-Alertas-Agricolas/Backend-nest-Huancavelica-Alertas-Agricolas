FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias desde el contexto raíz
COPY services/preference-service/package*.json ./
RUN npm install

# Copiar código fuente del servicio desde el contexto raíz
COPY services/preference-service/ ./

RUN npm run build

EXPOSE 3006

CMD ["npm", "run", "start:prod"]