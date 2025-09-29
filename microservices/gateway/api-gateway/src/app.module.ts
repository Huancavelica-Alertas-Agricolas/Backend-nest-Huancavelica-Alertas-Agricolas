import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT) || 3001 
        },
      },
      {
        name: 'WEATHER_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.WEATHER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.WEATHER_SERVICE_PORT) || 3002 
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.NOTIFICATION_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.NOTIFICATION_SERVICE_PORT) || 3003 
        },
      },
      {
        name: 'ALERT_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.ALERT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.ALERT_SERVICE_PORT) || 3004 
        },
      },
      {
        name: 'LOG_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.LOG_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.LOG_SERVICE_PORT) || 3005 
        },
      },
      {
        name: 'PREFERENCE_SERVICE',
        transport: Transport.TCP,
        options: { 
          host: process.env.PREFERENCE_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PREFERENCE_SERVICE_PORT) || 3006 
        },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class AppModule {}