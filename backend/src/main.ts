import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './shared/exception-filters/database.exception-filter';
import { HttpExceptionFilter } from './shared/exception-filters/http.exception-filter';

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env['CORS_ORIGIN']) {
    app.enableCors({
      origin: process.env['CORS_ORIGIN'],
    });
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DatabaseExceptionFilter(), new HttpExceptionFilter());
  app.use(express.static(path.join(__dirname, 'public')));

  if (!isProduction) {
    const options = new DocumentBuilder()
      .setTitle(process.env['PROJECT_NAME'])
      .setDescription(process.env['PROJECT_DESCRIPTION'])
      .setVersion(process.env['PROJECT_VERSION'])
      .addTag(process.env['PROJECT_TAG'])
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env['PORT']);
}

bootstrap();
