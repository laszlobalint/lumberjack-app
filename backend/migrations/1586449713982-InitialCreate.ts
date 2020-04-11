import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreate1586449713982 implements MigrationInterface {
  name = 'InitialCreate1586449713982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, `name` varchar(100) NOT NULL, `role` enum ('admin', 'guest') NOT NULL DEFAULT 'guest', UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `price` double NOT NULL, `amount` double NOT NULL, `description` text NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `purchase` (`id` int NOT NULL AUTO_INCREMENT, `amount` double NOT NULL, `price` double NOT NULL, `description` text NULL, `reduceStock` tinyint NOT NULL, `completed` tinyint NOT NULL, `deliveryDate` datetime NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `customerId` int NULL, `productId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `address` varchar(200) NOT NULL, `name` varchar(100) NULL, `phone` varchar(50) NULL, `companyName` varchar(100) NULL, `taxId` varchar(20) NULL, `nationalId` varchar(20) NULL, `checkingAccount` varchar(40) NULL, `description` text NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_2195a69f2b102198a497036ec9e` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_9af3a556aa0f166dd771a1e6c46` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_33520b6c46e1b3971c0a649d38b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `customer` ADD CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `customer` DROP FOREIGN KEY `FK_3f62b42ed23958b120c235f74df`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_33520b6c46e1b3971c0a649d38b`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_9af3a556aa0f166dd771a1e6c46`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_2195a69f2b102198a497036ec9e`', undefined);
    await queryRunner.query('ALTER TABLE `product` DROP FOREIGN KEY `FK_329b8ae12068b23da547d3b4798`', undefined);
    await queryRunner.query('DROP TABLE `customer`', undefined);
    await queryRunner.query('DROP TABLE `purchase`', undefined);
    await queryRunner.query('DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`', undefined);
    await queryRunner.query('DROP TABLE `product`', undefined);
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`', undefined);
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
