import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChannelEnumPreferenceService1760212002000 implements MigrationInterface {
    name = 'UpdateChannelEnumPreferenceService1760212002000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."preferencias_notificacion_canal_enum_new" AS ENUM('telegram','gmail','sms')`);
        await queryRunner.query(`ALTER TABLE "preferencias_notificacion" ALTER COLUMN "canal" TYPE "public"."preferencias_notificacion_canal_enum_new" USING canal::text::"public"."preferencias_notificacion_canal_enum_new"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."preferencias_notificacion_canal_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."preferencias_notificacion_canal_enum_new" RENAME TO "preferencias_notificacion_canal_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // noop
    }
}
