import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropCrossServiceTables1760246244554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop tables that belong to other services but were accidentally created in users_db
    await queryRunner.query(`DROP TABLE IF EXISTS public.logs CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.alert_canal CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.alertas CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.lecturas CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.estaciones CASCADE`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.preferencias_notificacion CASCADE`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS public.projects CASCADE`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.usuarios_projects_projects CASCADE`,
    );

    // Drop enum types created in this DB that belong to other services
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.logs_tipo_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.logs_status_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.alert_canal_canal_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.alert_canal_estado_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.alertas_tipo_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.alertas_estado_enum CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS public.preferencias_notificacion_canal_enum CASCADE`,
    );
  }

  public async down(): Promise<void> {
    // No-op: down is not implemented because restoring dropped objects requires full schema definitions
    // If needed, recreate statements should be added here.
    return;
  }
}
