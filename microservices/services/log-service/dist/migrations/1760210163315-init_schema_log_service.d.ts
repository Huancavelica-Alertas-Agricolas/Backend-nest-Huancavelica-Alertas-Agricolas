import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitSchemaLogService1760210163315 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
