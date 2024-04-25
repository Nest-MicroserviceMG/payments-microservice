import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './confing/envs';

async function bootstrap() {
  const logger = new Logger('Payments-ms');

  const app = await NestFactory.create(AppModule);

  await app.listen(envs.port);

  logger.log(`Server running on http://localhost:${envs.port}`);
}
bootstrap();
