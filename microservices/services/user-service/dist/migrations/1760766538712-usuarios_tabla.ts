import { MigrationInterface, QueryRunner } from "typeorm";

export class UsuariosTabla1760766538712 implements MigrationInterface {
    name = 'UsuariosTabla1760766538712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "ultima_alerta_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "ultimo_log_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "preferencias_notificacion_summary"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "ultimaAlertaId" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "ultimoLogId" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "preferenciasNotificacionSummary" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "terreno" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "cultivo" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "frecuencia" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "anio_objetivo" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "canal" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "experiencia" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "recibe_alertas" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "importancia" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "observaciones" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "observaciones"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "importancia"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "recibe_alertas"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "experiencia"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "canal"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "anio_objetivo"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "frecuencia"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "cultivo"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "terreno"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "preferenciasNotificacionSummary"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "ultimoLogId"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "ultimaAlertaId"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "preferencias_notificacion_summary" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "ultimo_log_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "ultima_alerta_id" integer`);
    }

}
