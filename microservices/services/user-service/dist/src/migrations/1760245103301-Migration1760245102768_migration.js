"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1760245102768Migration1760245103301 = void 0;
class Migration1760245102768Migration1760245103301 {
    constructor() {
        this.name = 'Migration1760245102768Migration1760245103301';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "usuarios" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "nombre" character varying NOT NULL, "email" character varying, "telefono" character varying, "ciudad" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "ultimaAlertaId" integer, "ultimoLogId" integer, "preferenciasNotificacionSummary" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9bb842949691c6276e1c36d6148" UNIQUE ("code"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }
}
exports.Migration1760245102768Migration1760245103301 = Migration1760245102768Migration1760245103301;
//# sourceMappingURL=1760245103301-Migration1760245102768_migration.js.map