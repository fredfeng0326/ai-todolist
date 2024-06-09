import { MigrationInterface, QueryRunner } from "typeorm";

export class  UpdateType1717644293879 implements MigrationInterface {
    name = 'UpdateType1717644293879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."step_status_enum" AS ENUM('FINISH', 'CLOSED', 'UNFINISHED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "step" ADD "status" "public"."step_status_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('FINISH', 'CLOSED', 'UNFINISHED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "public"."task_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."step_status_enum"`);
    }

}
