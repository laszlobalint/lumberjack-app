import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1585051963510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO `user` (email, password, name, role) VALUES ('admin@lumberjack.com', '$2b$10$UcQ2iWrcXSh3C3g7EWnGEOD0GKubnpGGU8vf7A6Dv5ql5AXU8GvVu', 'Admin', 'admin')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
