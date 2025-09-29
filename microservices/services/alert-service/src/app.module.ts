import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
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
    ]),
  ],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AppModule {}