import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchemaLogService1760210163315 implements MigrationInterface {
    name = 'InitSchemaLogService1760210163315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."logs_tipo_enum" AS ENUM('alerta_creada', 'alerta_enviada', 'alerta_cancelada', 'error_envio', 'lectura_recibida', 'notificacion_enviada', 'sistema', 'login', 'logout')`);
        await queryRunner.query(`CREATE TYPE "public"."logs_status_enum" AS ENUM('success', 'error', 'warning', 'info')`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "alertaId" integer, "tipo" "public"."logs_tipo_enum" NOT NULL, "status" "public"."logs_status_enum" NOT NULL DEFAULT 'info', "mensaje" text NOT NULL, "metadatos" json, "deliveredAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "public"."logs_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."logs_tipo_enum"`);
    }

}
