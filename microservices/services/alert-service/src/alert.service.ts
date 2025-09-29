import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export interface AlertRequest {
  email: string;
  userName: string;
  type?: 'weather' | 'frost' | 'drought';
}

export interface AlertResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  constructor(
    @Inject('WEATHER_SERVICE') private weatherService: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}

  async generateWeatherAlert(alertRequest: AlertRequest): Promise<AlertResponse> {
    this.logger.log(`Generando alerta climática para: ${alertRequest.email}`);
    
    try {
      // 1. Generar el reporte de clima
      this.logger.log('Paso 1: Generando reporte meteorológico...');
      const weatherReport = await firstValueFrom(
        this.weatherService.send('generate_weather_report', {})
      );

      if (!weatherReport.success) {
        this.logger.warn('El reporte meteorológico falló:', weatherReport.message);
        return {
          success: false,
          message: 'Error al generar el reporte meteorológico',
          error: weatherReport.error || weatherReport.message,
        };
      }

      // 2. Enviar alerta por email
      this.logger.log('Paso 2: Enviando alerta por email...');
      const emailResult = await firstValueFrom(
        this.notificationService.send('send_weather_alert', {
          to: alertRequest.email,
          name: alertRequest.userName,
          reportMessage: weatherReport.message
        })
      );

      if (!emailResult.success) {
        this.logger.warn('El envío de email falló:', emailResult.message);
        return {
          success: false,
          message: 'Reporte generado pero falló el envío de notificación',
          error: emailResult.error || emailResult.message,
          data: {
            weatherReport: weatherReport.data,
            emailError: emailResult.message
          }
        };
      }

      // 3. Éxito completo
      this.logger.log('Alerta climática generada y enviada exitosamente');
      return {
        success: true,
        message: 'Reporte de clima generado y alerta enviada exitosamente',
        data: {
          weatherReport: weatherReport.data,
          emailSent: true,
          recipient: alertRequest.email
        }
      };

    } catch (error) {
      this.logger.error('Error en la orquestación de la alerta climática:', error.stack);
      return {
        success: false,
        message: 'Error interno al generar la alerta climática',
        error: error.message
      };
    }
  }

  async generateFrostAlert(alertRequest: AlertRequest): Promise<AlertResponse> {
    this.logger.log(`Generando alerta de helada para: ${alertRequest.email}`);
    
    try {
      // 1. Obtener datos meteorológicos actuales
      const weatherData = await firstValueFrom(
        this.weatherService.send('get_weather_data', {})
      );

      if (!weatherData.success) {
        return {
          success: false,
          message: 'Error al obtener datos meteorológicos',
          error: weatherData.error,
        };
      }

      // 2. Analizar riesgo de helada
      const frostRisk = weatherData.data?.some((record: any) => record.riesgo_helada);
      
      if (!frostRisk) {
        return {
          success: true,
          message: 'No se detectó riesgo de helada actual',
          data: { frostRisk: false }
        };
      }

      // 3. Enviar alerta de helada
      const emailResult = await firstValueFrom(
        this.notificationService.send('send_email', {
          to: alertRequest.email,
          subject: '🧊 Alerta de Helada - Protege tus Cultivos',
          template: 'weather-alert',
          context: {
            name: alertRequest.userName,
            reportMessage: 'Se ha detectado riesgo de helada en las próximas horas. Toma las medidas preventivas necesarias.',
            date: new Date().toLocaleDateString('es-ES')
          }
        })
      );

      return {
        success: emailResult.success,
        message: emailResult.success 
          ? 'Alerta de helada enviada exitosamente' 
          : 'Error enviando alerta de helada',
        data: {
          frostRisk: true,
          weatherData: weatherData.data,
          emailSent: emailResult.success
        },
        error: emailResult.error
      };

    } catch (error) {
      this.logger.error('Error generando alerta de helada:', error.stack);
      return {
        success: false,
        message: 'Error interno al generar alerta de helada',
        error: error.message
      };
    }
  }
}