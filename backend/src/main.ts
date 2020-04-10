import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './shared/exception-filters/database.exception-filter';
import { HttpExceptionFilter } from './shared/exception-filters/http.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env['CORS_ORIGIN'] });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DatabaseExceptionFilter(), new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle(process.env['PROJECT_NAME'])
    .setDescription(process.env['PROJECT_DESCRIPTION'])
    .setVersion(process.env['PROJECT_VERSION'])
    .addTag(process.env['PROJECT_TAG'])
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  console.log(process.env['PORT']);
  await app.listen(process.env['PORT']);
}

bootstrap();
