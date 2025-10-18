"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchemaPreferenceService1760210237253 = void 0;
class InitSchemaPreferenceService1760210237253 {
    constructor() {
        this.name = 'InitSchemaPreferenceService1760210237253';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."preferencias_notificacion_canal_enum" AS ENUM('email', 'sms', 'push', 'whatsapp')`);
        await queryRunner.query(`CREATE TYPE "public"."preferencias_notificacion_tipoalerta_enum" AS ENUM('lluvia', 'temperatura', 'helada', 'sequia', 'viento', 'todas')`);
        await queryRunner.query(`CREATE TABLE "preferencias_notificacion" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "canal" "public"."preferencias_notificacion_canal_enum" NOT NULL, "tipoAlerta" "public"."preferencias_notificacion_tipoalerta_enum" NOT NULL DEFAULT 'todas', "activo" boolean NOT NULL DEFAULT true, "destinatario" character varying, "configuracion" json, "horaInicio" TIME, "horaFin" TIME, "diasSemana" text, "alertasInmediatas" boolean NOT NULL DEFAULT true, "resumenDiario" boolean NOT NULL DEFAULT false, "reporteSemanal" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b64ac87f77bcbf629d881978c" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "preferencias_notificacion"`);
        await queryRunner.query(`DROP TYPE "public"."preferencias_notificacion_tipoalerta_enum"`);
        await queryRunner.query(`DROP TYPE "public"."preferencias_notificacion_canal_enum"`);
    }
}
exports.InitSchemaPreferenceService1760210237253 = InitSchemaPreferenceService1760210237253;
//# sourceMappingURL=1760210237253-init_schema_preference_service.js.map