import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717922482257 implements MigrationInterface {
    name = 'Migrations1717922482257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_vip" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_vip"`);
    }

}
