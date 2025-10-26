import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import logger from './logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 3002,
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  await app.listen();
  logger.info('🌤️ Weather Service is listening on port 3002');
}

bootstrap();