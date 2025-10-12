import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropDuplicatedTablesUserService1760212000000
  implements MigrationInterface
{
  name = 'DropDuplicatedTablesUserService1760212000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop dependent tables first to respect FK relationships, use CASCADE to remove constraints
    await queryRunner.query(`DROP TABLE IF EXISTS "logs" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "alert_canal" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "alertas" CASCADE`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "preferencias_notificacion" CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreating tables is dangerous without original schema; keep down minimal
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "alertas" (id SERIAL)`);
  }
}
