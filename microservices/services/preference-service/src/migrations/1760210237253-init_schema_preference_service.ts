import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemaPreferenceService1760210237253 implements MigrationInterface {
    name = 'InitSchemaPreferenceService1760210237253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."preferencias_notificacion_canal_enum" AS ENUM('email', 'sms', 'push', 'whatsapp')`);
        await queryRunner.query(`CREATE TYPE "public"."preferencias_notificacion_tipoalerta_enum" AS ENUM('lluvia', 'temperatura', 'helada', 'sequia', 'viento', 'todas')`);
        await queryRunner.query(`CREATE TABLE "preferencias_notificacion" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "canal" "public"."preferencias_notificacion_canal_enum" NOT NULL, "tipoAlerta" "public"."preferencias_notificacion_tipoalerta_enum" NOT NULL DEFAULT 'todas', "activo" boolean NOT NULL DEFAULT true, "destinatario" character varying, "configuracion" json, "horaInicio" TIME, "horaFin" TIME, "diasSemana" text, "alertasInmediatas" boolean NOT NULL DEFAULT true, "resumenDiario" boolean NOT NULL DEFAULT false, "reporteSemanal" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b64ac87f77bcbf629d881978c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "preferencias_notificacion"`);
        await queryRunner.query(`DROP TYPE "public"."preferencias_notificacion_tipoalerta_enum"`);
        await queryRunner.query(`DROP TYPE "public"."preferencias_notificacion_canal_enum"`);
    }

}
