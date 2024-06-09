import { MigrationInterface, QueryRunner } from "typeorm";

export class  UpdateUser1717922901058 implements MigrationInterface {
    name = 'UpdateUser1717922901058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin"`);
    }

}
