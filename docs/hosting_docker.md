# Hosting backend con Docker — Guía práctica

Esta guía explica cómo desplegar el backend de Agro-Alertas usando Docker y Docker Compose (recomendado). Incluye instrucciones para un VPS Ubuntu, Windows Server (con Docker Desktop) y opciones si prefieres no usar Docker.

Contenido:
- Requisitos
- Desplegar en VPS Ubuntu (Docker + Docker Compose)
- Desplegar en Windows Server
- Desplegar sin Docker (instalar Node y Postgres)
- CircleCI: build y push de imágenes (snippet)
- Consideraciones de seguridad y backups

---

Requisitos
- Acceso SSH al servidor (root o sudo)
- Docker y Docker Compose instalados
- Puerto 3000 (gateway) y 5432 (Postgres) abiertos según configuración

Variables de entorno claves (ejecutar en server o en archivo `.env` utilizado por Docker Compose):

```
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=agro_alertas
POSTGRES_PORT=5432
NODE_ENV=production
```

---

Desplegar en VPS Ubuntu (recomendado)

1) Preparar el servidor (Ubuntu 22.04+)

```bash
# Conéctate por SSH al servidor y luego ejecuta (ejemplo para Ubuntu):
sudo apt update; sudo apt upgrade -y
# Instalar dependencias para Docker
sudo apt install -y ca-certificates curl gnupg lsb-release
# Instalar Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
# Permitir tu usuario usar docker sin sudo
sudo usermod -aG docker $USER
# Reinicia sesión o usa: newgrp docker
```

2) Copiar el repositorio y archivos al servidor

```bash
# En tu máquina local
git clone <repo-url> app
scp -r app user@your-server:/opt/agro-alertas
# En el server
cd /opt/agro-alertas
```

3) Configurar `.env` y volúmenes

Crear un archivo `.env` con las variables (DB_USER/DB_PASSWORD/DB_NAME) o exportarlas en el ambiente.

4) Levantar con Docker Compose

```bash
# Desde /opt/agro-alertas
docker compose up -d --build
# Comprobar logs
docker compose logs -f
```

5) Inicializar esquema (si no quieres que el contenedor inicialice automáticamente)

```bash
docker exec -i agro_postgres psql -U ${DB_USER:-admin} -d ${DB_NAME:-agro_alertas} < sql/init_schema.sql
```

6) Supervisar y reinicios automáticos

- `docker compose up -d --build` con `restart: unless-stopped` ya configurado en `docker-compose.yml`.
- Para monitoreo: usar `watch docker ps` o herramientas (Portainer, Grafana).

---

Desplegar en Windows Server (con Docker Desktop)

1) Instalar Docker Desktop y habilitar contenedores Linux.
2) Copiar el repo al servidor o clonar.
3) Abrir PowerShell como administrador y ejecutar:

```powershell
cd C:\path\to\repo
docker compose up -d --build
```

4) Inicializar la DB (PowerShell):

```powershell
docker exec -i agro_postgres psql -U admin -d agro_alertas < .\sql\init_schema.sql
```

---

Desplegar sin Docker (instalar Node y Postgres manualmente)

Si prefieres no usar Docker en la máquina de destino:

1) Instalar Node.js 18+ (nvm o instalador). Instalar PostgreSQL 15.
2) Para cada microservicio (ej: `microservices/services/user-service`):

```powershell
cd microservices/services/user-service
npm ci
npm run build # si existe
# Establecer variables de entorno y ejecutar
NODE_ENV=production DB_HOST=localhost DB_PORT=5432 DB_USER=admin DB_PASSWORD=admin DB_NAME=agro_alertas npm start
```

3) Para ejecutar varios servicios en background, puedes crear archivos `systemd` (Linux) o servicios de Windows.

Nota: la experiencia sin Docker requiere manejo manual de dependencias, versiones y proceso; Docker simplifica la replicación.

---

CircleCI: build + push (snippet)

Si quieres construir y publicar imágenes desde CircleCI a Docker Hub, añade un job como este al `.circleci/config.yml` (placeholders para variables):

```yaml
# snippet
jobs:
  docker-build-push:
    machine: true
    steps:
      - checkout
      - run: echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
      - run:
          name: Build and push services
          command: |
            for svc in microservices/services/*; do
              if [ -f "$svc/Dockerfile" ]; then
                name=$(basename $svc)
                docker build -t myorg/$name:latest $svc
                docker push myorg/$name:latest
              fi
            done
```

Configurar variables en CircleCI: `DOCKERHUB_USER`, `DOCKERHUB_PASS`.

---

Consideraciones de seguridad y backups
- Asegura Postgres usando contrases fuertes y, en produccin, no exponer 5432 públicamente.
- Usa volmenes y backups regulares (pg_dump o snapshots del volumen Docker).
- Usa TLS y un proxy (nginx/caddy) para exponer el gateway por HTTPS con certificados (Let's Encrypt).

---

Acciones opcionales que puedo hacer por ti:
- Añadir un job a `.circleci/config.yml` que haga `docker build` y `docker push` (dime registry).
- Crear un script `deploy.sh` que automatice `git pull && docker compose pull && docker compose up -d --build` en el servidor.
- Generar ejemplo de `systemd` service para correr los microservicios sin Docker.

---

Variables y claves necesarias para CircleCI (resumen)

- DOCKERHUB_USER: usuario del registry (CircleCI Project > Environment Variables)
- DOCKERHUB_PASS: token o contraseña (CircleCI Project > Environment Variables)
- DEPLOY_SSH_KEY: Private SSH key para acceder al servidor (subir en Project Settings > SSH Keys)
- DEPLOY_SSH_FP: Fingerprint de la llave pública añadida (usar en `add_ssh_keys` en config)
- DEPLOY_HOST: IP o hostname del servidor de producción
- DEPLOY_USER: usuario SSH que hará el deploy (ej. ubuntu)
- DEPLOY_PATH: ruta en el servidor donde está el repo (ej. /opt/agro-alertas)

Pasos rápidos para añadir la llave SSH en CircleCI:
1. En tu máquina local, genera una llave (si no existe): `ssh-keygen -t ed25519 -C "circleci-deploy"`
2. Añade la clave pública al `~/.ssh/authorized_keys` del servidor
3. En el panel de CircleCI del proyecto: Project Settings -> SSH Keys -> Add SSH Key. Pega la clave privada en "Private Key".
4. Copia el fingerprint que CircleCI muestra y ponlo como variable de entorno `DEPLOY_SSH_FP`.

