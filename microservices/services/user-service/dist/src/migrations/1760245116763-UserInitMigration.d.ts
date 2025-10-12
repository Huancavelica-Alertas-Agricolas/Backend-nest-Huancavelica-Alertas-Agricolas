import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserInitMigration1760245116763 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
