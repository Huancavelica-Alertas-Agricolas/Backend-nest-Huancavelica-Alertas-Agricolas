import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security
  app.use(helmet());
  
  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Agro-Alertas API')
    .setDescription('Sistema de Microservicios para Monitoreo Climático Agrícola')
    .setVersion('2.0.0')
    .addTag('users', 'Gestión de usuarios')
    .addTag('weather', 'Datos meteorológicos')
    .addTag('alerts', 'Sistema de alertas')
    .addTag('notifications', 'Servicio de notificaciones')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  Logger.log(`🚀 API Gateway running on port ${port}`);
  Logger.log(`📚 Swagger documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();