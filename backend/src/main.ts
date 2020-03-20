import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
