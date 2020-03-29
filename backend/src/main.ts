import { NestFactory, NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, { cors: { origin: process.env['CORS'] } });

  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle(process.env['PROJECT_NAME'])
    .setDescription(process.env['PROJECT_DESCRIPTION'])
    .setVersion(process.env['PROJECT_VERSION'])
    .addTag(process.env['PROJECT_TAG'])
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env['SERVER_PORT']);
}

bootstrap();
