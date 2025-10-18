import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchemaUserService1760210573276 implements MigrationInterface {
  name = 'InitSchemaUserService1760210573276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "usuarios" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "nombre" character varying NOT NULL, "email" character varying, "telefono" character varying, "ciudad" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "ultimaAlertaId" integer, "ultimoLogId" integer, "preferenciasNotificacionSummary" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9bb842949691c6276e1c36d6148" UNIQUE ("code"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'preferencias_notificacion_canal_enum') THEN\n          CREATE TYPE "public"."preferencias_notificacion_canal_enum" AS ENUM('email', 'sms', 'push');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "preferencias_notificacion" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "canal" "public"."preferencias_notificacion_canal_enum" NOT NULL, "activo" boolean NOT NULL DEFAULT true, "configuracion" character varying, "horaInicio" TIME, "horaFin" TIME, "diasSemana" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b64ac87f77bcbf629d881978c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "lecturas" ("id" SERIAL NOT NULL, "estacionId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "temp_max" numeric(5,2) NOT NULL, "temp_min" numeric(5,2), "lluvia_mm" numeric(5,2) NOT NULL, "humedad" numeric(5,2), "presion" numeric(6,2), "velocidadViento" numeric(5,2), "direccionViento" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8843b4f95f8fd7fd75bd502bf49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "estaciones" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "ubicacion" character varying NOT NULL, "latitud" numeric(10,7), "longitud" numeric(10,7), "activa" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fe18ed12cd95a6b4302a9bfe498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alertas_tipo_enum') THEN\n          CREATE TYPE "public"."alertas_tipo_enum" AS ENUM('lluvia', 'temperatura', 'helada', 'sequia', 'viento');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alertas_estado_enum') THEN\n          CREATE TYPE "public"."alertas_estado_enum" AS ENUM('activa', 'enviada', 'cancelada', 'expirada');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "alertas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "mensaje" text NOT NULL, "tipo" "public"."alertas_tipo_enum" NOT NULL DEFAULT 'lluvia', "estado" "public"."alertas_estado_enum" NOT NULL DEFAULT 'activa', "estacionId" integer NOT NULL, "usuarioId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "fechaExpiracion" TIMESTAMP, "parametros" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b474c4021f8d6e4e13383ef1106" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_canal_canal_enum') THEN\n          CREATE TYPE "public"."alert_canal_canal_enum" AS ENUM('email', 'sms', 'push', 'webhook');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_canal_estado_enum') THEN\n          CREATE TYPE "public"."alert_canal_estado_enum" AS ENUM('pendiente', 'enviado', 'fallido', 'entregado');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "alert_canal" ("id" SERIAL NOT NULL, "alertaId" integer NOT NULL, "canal" "public"."alert_canal_canal_enum" NOT NULL, "destinatario" character varying NOT NULL, "estado" "public"."alert_canal_estado_enum" NOT NULL DEFAULT 'pendiente', "fecha_envio" TIMESTAMP, "mensaje_error" text, "metadatos" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c00912038061f91e8f5c615e505" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'logs_tipo_enum') THEN\n          CREATE TYPE "public"."logs_tipo_enum" AS ENUM('alerta_creada', 'alerta_enviada', 'alerta_cancelada', 'error_envio', 'lectura_recibida', 'sistema');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `DO $$\n      BEGIN\n        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'logs_status_enum') THEN\n          CREATE TYPE "public"."logs_status_enum" AS ENUM('success', 'error', 'warning', 'info');\n        END IF;\n      END$$;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "logs" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "alertaCanalId" integer, "tipo" "public"."logs_tipo_enum" NOT NULL, "status" "public"."logs_status_enum" NOT NULL DEFAULT 'info', "mensaje" text NOT NULL, "metadatos" json, "deliveredAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "preferencias_notificacion" ADD CONSTRAINT "FK_2e4a8e6894bc5d88cac4cbde21b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecturas" ADD CONSTRAINT "FK_0edcc18aceee52e1e92be560031" FOREIGN KEY ("estacionId") REFERENCES "estaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" ADD CONSTRAINT "FK_abe9e8672269d1aa3a73ded2339" FOREIGN KEY ("estacionId") REFERENCES "estaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" ADD CONSTRAINT "FK_df89995a5765a2884753707f1ed" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_canal" ADD CONSTRAINT "FK_4fe415bad3cc91d617b4a171378" FOREIGN KEY ("alertaId") REFERENCES "alertas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_c50da38edd1feba47706acaa50b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_aa69ed518248facf0dc399c9d72" FOREIGN KEY ("alertaCanalId") REFERENCES "alert_canal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_aa69ed518248facf0dc399c9d72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_c50da38edd1feba47706acaa50b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_canal" DROP CONSTRAINT "FK_4fe415bad3cc91d617b4a171378"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" DROP CONSTRAINT "FK_df89995a5765a2884753707f1ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" DROP CONSTRAINT "FK_abe9e8672269d1aa3a73ded2339"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecturas" DROP CONSTRAINT "FK_0edcc18aceee52e1e92be560031"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preferencias_notificacion" DROP CONSTRAINT "FK_2e4a8e6894bc5d88cac4cbde21b"`,
    );
    await queryRunner.query(`DROP TABLE "logs"`);
    await queryRunner.query(`DROP TYPE "public"."logs_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."logs_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "alert_canal"`);
    await queryRunner.query(`DROP TYPE "public"."alert_canal_estado_enum"`);
    await queryRunner.query(`DROP TYPE "public"."alert_canal_canal_enum"`);
    await queryRunner.query(`DROP TABLE "alertas"`);
    await queryRunner.query(`DROP TYPE "public"."alertas_estado_enum"`);
    await queryRunner.query(`DROP TYPE "public"."alertas_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "estaciones"`);
    await queryRunner.query(`DROP TABLE "lecturas"`);
    await queryRunner.query(`DROP TABLE "preferencias_notificacion"`);
    await queryRunner.query(
      `DROP TYPE "public"."preferencias_notificacion_canal_enum"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
