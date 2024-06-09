import { MigrationInterface, QueryRunner } from "typeorm";

export class  UpdateStatus1717928226577 implements MigrationInterface {
    name = 'UpdateStatus1717928226577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" ALTER COLUMN "status" SET DEFAULT 'UNFINISHED'`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'UNFINISHED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "step" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
