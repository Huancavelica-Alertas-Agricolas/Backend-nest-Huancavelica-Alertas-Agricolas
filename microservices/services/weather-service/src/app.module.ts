import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { RiesgoClimaService } from './riesgo-clima.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ClientsModule.register([
      {
        name: 'ALERT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ALERT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.ALERT_SERVICE_PORT) || 3004,
        },
      },
    ]),
    PrometheusModule.register(),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, RiesgoClimaService],
})
export class AppModule {}