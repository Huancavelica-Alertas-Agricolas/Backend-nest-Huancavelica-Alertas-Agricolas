"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchemaLogService1760210163315 = void 0;
class InitSchemaLogService1760210163315 {
    constructor() {
        this.name = 'InitSchemaLogService1760210163315';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."logs_tipo_enum" AS ENUM('alerta_creada', 'alerta_enviada', 'alerta_cancelada', 'error_envio', 'lectura_recibida', 'notificacion_enviada', 'sistema', 'login', 'logout')`);
        await queryRunner.query(`CREATE TYPE "public"."logs_status_enum" AS ENUM('success', 'error', 'warning', 'info')`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "alertaId" integer, "tipo" "public"."logs_tipo_enum" NOT NULL, "status" "public"."logs_status_enum" NOT NULL DEFAULT 'info', "mensaje" text NOT NULL, "metadatos" json, "deliveredAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "public"."logs_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."logs_tipo_enum"`);
    }
}
exports.InitSchemaLogService1760210163315 = InitSchemaLogService1760210163315;
//# sourceMappingURL=1760210163315-init_schema_log_service.js.map