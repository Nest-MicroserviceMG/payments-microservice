import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './confing/envs';

async function bootstrap() {
  const logger = new Logger('Payments-ms');

  const app = await NestFactory.create(AppModule, {
    //esto es para que se pueda leer el body de las peticiones
    rawBody: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(envs.port);

  logger.log(`Server running on http://localhost:${envs.port}`);
}
bootstrap();
