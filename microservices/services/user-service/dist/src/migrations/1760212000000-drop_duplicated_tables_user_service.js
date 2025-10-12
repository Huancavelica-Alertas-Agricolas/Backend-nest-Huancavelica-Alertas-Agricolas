"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDuplicatedTablesUserService1760212000000 = void 0;
class DropDuplicatedTablesUserService1760212000000 {
    constructor() {
        this.name = 'DropDuplicatedTablesUserService1760212000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "logs" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "alert_canal" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "alertas" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "preferencias_notificacion" CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "alertas" (id SERIAL)`);
    }
}
exports.DropDuplicatedTablesUserService1760212000000 = DropDuplicatedTablesUserService1760212000000;
//# sourceMappingURL=1760212000000-drop_duplicated_tables_user_service.js.map