import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mariadb',
        host: process.env['DATABASE_HOST'],
        port: Number(process.env['DATABASE_PORT']),
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        database: process.env['DATABASE_NAME'],
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
