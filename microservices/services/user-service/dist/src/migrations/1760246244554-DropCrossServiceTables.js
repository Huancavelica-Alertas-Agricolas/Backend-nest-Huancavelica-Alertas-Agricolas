"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropCrossServiceTables1760246244554 = void 0;
class DropCrossServiceTables1760246244554 {
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS public.logs CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.alert_canal CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.alertas CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.lecturas CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.estaciones CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.preferencias_notificacion CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.projects CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.usuarios_projects_projects CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.logs_tipo_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.logs_status_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.alert_canal_canal_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.alert_canal_estado_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.alertas_tipo_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.alertas_estado_enum CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS public.preferencias_notificacion_canal_enum CASCADE`);
    }
    async down() {
        return;
    }
}
exports.DropCrossServiceTables1760246244554 = DropCrossServiceTables1760246244554;
//# sourceMappingURL=1760246244554-DropCrossServiceTables.js.map