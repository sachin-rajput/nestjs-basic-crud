import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Enabling "whitelist" feature of ValidationPipe */
  /* Throw errors when whitelisted properties are found */
  /* Enabling auto transform feature of ValidationPipe */
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // 👈
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
