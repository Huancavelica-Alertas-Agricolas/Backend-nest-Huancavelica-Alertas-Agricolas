import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitSchemaMigration1760242724204 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
