import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/user/user.entity';

export class SeedUserRecord1584736907034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = getRepository(User).create({
      username: 'testuser',
      // 12345678
      password: '$2y$10$3P4wLnGueG0XWNdsL4O.YuAk6sbpO5Bxb0l8N5t2rLO8JUcP11rJy',
    });

    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
