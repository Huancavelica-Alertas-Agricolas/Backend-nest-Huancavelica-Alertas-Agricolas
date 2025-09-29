import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WeatherService, WeatherResponse } from './weather.service';

@Controller()
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name);

  constructor(private readonly weatherService: WeatherService) {}

  @MessagePattern('generate_weather_report')
  async generateWeatherReport(): Promise<WeatherResponse> {
    this.logger.log('Generando reporte meteorológico...');
    return await this.weatherService.generateAndSaveWeatherReport();
  }

  @MessagePattern('get_weather_data')
  async getWeatherData(): Promise<WeatherResponse> {
    this.logger.log('Obteniendo datos meteorológicos...');
    return await this.weatherService.getCurrentWeatherData();
  }
}