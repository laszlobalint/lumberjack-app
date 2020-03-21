import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1584811411199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // const user = getRepository(User).create({
    //   email: 'testuser@lumberjack.com',
    //   name: 'Test User',
    //   // 12345678
    //   password: '$2y$10$3P4wLnGueG0XWNdsL4O.YuAk6sbpO5Bxb0l8N5t2rLO8JUcP11rJy',
    // });

    // await getRepository(User).save(user);
    await queryRunner.query(
      "INSERT INTO `user` (email, password, name) VALUES ('testuser@lumberjack.com', '$2y$10$3P4wLnGueG0XWNdsL4O.YuAk6sbpO5Bxb0l8N5t2rLO8JUcP11rJy', 'Test User')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
