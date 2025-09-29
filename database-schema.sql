-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2025-09-29T07:26:10.809Z

CREATE TYPE "alert_canal_canal_enum" AS ENUM (
  'email',
  'sms',
  'push',
  'webhook'
);

CREATE TYPE "alert_canal_estado_enum" AS ENUM (
  'pendiente',
  'enviado',
  'fallido',
  'entregado'
);

CREATE TYPE "alertas_estado_enum" AS ENUM (
  'activa',
  'enviada',
  'cancelada',
  'expirada'
);

CREATE TYPE "alertas_tipo_enum" AS ENUM (
  'lluvia',
  'temperatura',
  'helada',
  'sequia',
  'viento'
);

CREATE TYPE "logs_status_enum" AS ENUM (
  'success',
  'error',
  'warning',
  'info'
);

CREATE TYPE "logs_tipo_enum" AS ENUM (
  'alerta_creada',
  'alerta_enviada',
  'alerta_cancelada',
  'error_envio',
  'lectura_recibida',
  'sistema'
);

CREATE TYPE "preferencias_notificacion_canal_enum" AS ENUM (
  'email',
  'sms',
  'push'
);

CREATE TABLE "lecturas" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "estacion_id" int4 NOT NULL,
  "timestamp" timestamp NOT NULL,
  "temp_max" numeric(5,2) NOT NULL,
  "temp_min" numeric(5,2),
  "lluvia_mm" numeric(5,2) NOT NULL,
  "humedad" numeric(5,2),
  "presion" numeric(6,2),
  "velocidad_viento" numeric(5,2),
  "direccion_viento" varchar,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "estacionId" int4
);

CREATE TABLE "estaciones" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "nombre" varchar NOT NULL,
  "ubicacion" varchar NOT NULL,
  "latitud" numeric(10,7),
  "longitud" numeric(10,7),
  "activa" bool NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "alert_canal" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "alerta_id" int4 NOT NULL,
  "canal" alert_canal_canal_enum NOT NULL,
  "destinatario" varchar NOT NULL,
  "estado" alert_canal_estado_enum NOT NULL DEFAULT 'pendiente',
  "fecha_envio" timestamp,
  "mensaje_error" text,
  "metadatos" json,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "alertaId" int4
);

CREATE TABLE "alertas" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "titulo" varchar NOT NULL,
  "mensaje" text NOT NULL,
  "tipo" alertas_tipo_enum NOT NULL DEFAULT 'lluvia',
  "estado" alertas_estado_enum NOT NULL DEFAULT 'activa',
  "estacion_id" int4 NOT NULL,
  "usuario_id" int4 NOT NULL,
  "timestamp" timestamp NOT NULL,
  "fecha_expiracion" timestamp,
  "parametros" json,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "estacionId" int4,
  "usuarioId" int4
);

CREATE TABLE "logs" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "usuario_id" int4 NOT NULL,
  "alerta_canal_id" int4,
  "tipo" logs_tipo_enum NOT NULL,
  "status" logs_status_enum NOT NULL DEFAULT 'info',
  "mensaje" text NOT NULL,
  "metadatos" json,
  "delivered_at" timestamp NOT NULL DEFAULT (now()),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "usuarioId" int4,
  "alertaCanalId" int4
);

CREATE TABLE "preferencias_notificacion" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "usuario_id" int4 NOT NULL,
  "canal" preferencias_notificacion_canal_enum NOT NULL,
  "activo" bool NOT NULL DEFAULT true,
  "configuracion" varchar,
  "hora_inicio" time,
  "hora_fin" time,
  "dias_semana" text,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now()),
  "usuarioId" int4
);

CREATE TABLE "usuarios" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar UNIQUE NOT NULL,
  "nombre" varchar NOT NULL,
  "email" varchar,
  "telefono" varchar,
  "ciudad" varchar NOT NULL,
  "activo" bool NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

ALTER TABLE "alert_canal" ADD CONSTRAINT "FK_4fe415bad3cc91d617b4a171378" FOREIGN KEY ("alertaId") REFERENCES "alertas" ("id");

ALTER TABLE "alertas" ADD CONSTRAINT "FK_abe9e8672269d1aa3a73ded2339" FOREIGN KEY ("estacionId") REFERENCES "estaciones" ("id");

ALTER TABLE "alertas" ADD CONSTRAINT "FK_df89995a5765a2884753707f1ed" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id");

ALTER TABLE "lecturas" ADD CONSTRAINT "FK_0edcc18aceee52e1e92be560031" FOREIGN KEY ("estacionId") REFERENCES "estaciones" ("id");

ALTER TABLE "logs" ADD CONSTRAINT "FK_aa69ed518248facf0dc399c9d72" FOREIGN KEY ("alertaCanalId") REFERENCES "alert_canal" ("id");

ALTER TABLE "logs" ADD CONSTRAINT "FK_c50da38edd1feba47706acaa50b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id");

ALTER TABLE "preferencias_notificacion" ADD CONSTRAINT "FK_2e4a8e6894bc5d88cac4cbde21b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id");
