import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlertService, AlertRequest, AlertResponse } from './alert.service';

@Controller()
export class AlertController {
  private readonly logger = new Logger(AlertController.name);

  constructor(private readonly alertService: AlertService) {}

  @MessagePattern('generate_weather_alert')
  async generateWeatherAlert(@Payload() alertRequest: AlertRequest): Promise<AlertResponse> {
    this.logger.log('Procesando solicitud de alerta meteorológica:', alertRequest);
    return await this.alertService.generateWeatherAlert(alertRequest);
  }

  @MessagePattern('generate_frost_alert')
  async generateFrostAlert(@Payload() alertRequest: AlertRequest): Promise<AlertResponse> {
    this.logger.log('Procesando solicitud de alerta de helada:', alertRequest);
    return await this.alertService.generateFrostAlert(alertRequest);
  }
}