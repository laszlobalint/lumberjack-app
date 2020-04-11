import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1586449725313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO `user` (email, password, name, role) VALUES ('admin@lumberjack.com', '$2b$10$UcQ2iWrcXSh3C3g7EWnGEOD0GKubnpGGU8vf7A6Dv5ql5AXU8GvVu', 'Admin', 'admin')",
    );
    await queryRunner.query(
      "INSERT INTO `product` (name, price, amount, description, createdDate, userId) VALUES ('oak', '1500', '5000', 'Very good oak.', '2020-03-24', '1')",
    );
    await queryRunner.query(
      "INSERT INTO `customer` (name, address, phone, createdDate, userId) VALUES ('Zvonomir Jovančić', 'Rade Koncara 42.', '547-803', '2020-03-24', '1')",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<any> {
    return null;
  }
}
