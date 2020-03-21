import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1584811411199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO `user` (email, password, name) VALUES ('testuser@lumberjack.com', '$2b$10$UcQ2iWrcXSh3C3g7EWnGEOD0GKubnpGGU8vf7A6Dv5ql5AXU8GvVu', 'Test User')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
