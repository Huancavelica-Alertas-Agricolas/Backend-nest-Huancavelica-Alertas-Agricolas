import axios from 'axios';
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
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {}

  private get webhookUrl() {
    return process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/clima-alerta';
  }

  private get webhookSecret() {
    return process.env.N8N_WEBHOOK_SECRET;
  }

  private async postToN8n(payload: any) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.webhookSecret) headers['x-n8n-signature'] = this.webhookSecret;
    await axios.post(this.webhookUrl, payload, { headers });
  }

  // Nuevo flujo: procesa una alerta puntual emitida por weather-service
  async processClimateAlert(alertData: { tipo: string; fecha?: string; descripcion: string }): Promise<any> {
    this.logger.log(`Procesando alerta puntual: ${JSON.stringify(alertData)}`);
    try {
      // 1) Obtener destinatarios del user-service
      const users = await firstValueFrom(this.userService.send('get_all_users', {}));
      
      // Filtrar solo usuarios con email válido (sin verificar recibe_alertas por ahora)
      const recipientsRaw = Array.isArray(users)
        ? users
            .filter((u: any) => u?.email && u.email.trim() !== '')
            .map((u: any) => ({
              email: u.email,
              name:
                u.nombre || u.nombres || u.name ||
                `${(u.nombres || '').toString().trim()} ${(u.apellidos || u.apellido || '').toString().trim()}`.trim() ||
                'Agricultor/a',
            }))
        : [];

      // Deduplicar por email
      const uniqueMap = new Map<string, { email: string; name: string }>();
      for (const r of recipientsRaw) {
        if (!uniqueMap.has(r.email)) uniqueMap.set(r.email, r);
      }
      const recipients = Array.from(uniqueMap.values());

      this.logger.log(`📧 Destinatarios encontrados: ${recipients.length}`);
      
      if (recipients.length === 0) {
        this.logger.warn('⚠️ No hay destinatarios con email válido para enviar la alerta');
      }

      const reportMessage = alertData.descripcion;
      const useN8n = (process.env.USE_N8N_FOR_EMAIL || 'false').toLowerCase() === 'true';

      if (useN8n) {
        // 2) Enviar a n8n (únicamente) si está habilitado
        const payload = {
          tipo: alertData.tipo,
          fecha: alertData.fecha || new Date().toISOString(),
          descripcion: alertData.descripcion,
          recipients: recipients.map((r) => r.email),
          severity: 'media',
          dedupeKey: `${alertData.tipo}|${new Date().toISOString().slice(0, 13)}`,
        };
        this.logger.log(`📤 Enviando a n8n: ${JSON.stringify({ tipo: payload.tipo, recipients: payload.recipients })}`);
        await this.postToN8n(payload);
      } else {
        // 2) Enviar emails usando Notification Service con plantilla
        try {
          await Promise.all(
            recipients.map((r) =>
              firstValueFrom(
                this.notificationService.send('send_email', {
                  to: r.email,
                  name: r.name,
                  reportMessage,
                }),
              ),
            ),
          );
          this.logger.log(`📧 Emails de alerta enviados via notification-service a ${recipients.length} destinatarios`);
        } catch (e) {
          this.logger.error(`❌ Error enviando emails via notification-service: ${e.message}`);
        }
      }

      // 3) Construir payload (retorno informativo)
      const payload = {
        tipo: alertData.tipo,
        fecha: alertData.fecha || new Date().toISOString(),
        descripcion: alertData.descripcion,
        recipients: recipients.map((r) => r.email),
        severity: 'media',
        dedupeKey: `${alertData.tipo}|${new Date().toISOString().slice(0, 13)}`,
      };

      return {
        success: true,
        message: useN8n ? 'Alerta enviada vía n8n' : 'Alerta enviada via notification-service',
        data: { recipients: recipients.map((r) => r.email), payload }
      };
    } catch (error) {
      this.logger.error('Error procesando alerta puntual:', error.stack);
      return {
        success: false,
        message: 'Error procesando alerta puntual',
        error: error.message
      };
    }
  }

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

      // 2. Resolver destinatarios desde user-service
      this.logger.log('Paso 2: Obteniendo destinatarios desde user-service...');
      const users = await firstValueFrom(this.userService.send('get_all_users', {}));
      const recipientsRaw = Array.isArray(users)
        ? users
            .filter((u: any) => u?.email && (u?.recibe_alertas ?? true))
            .map((u: any) => ({
              email: u.email,
              name:
                u.nombre || u.nombres || u.name ||
                `${(u.nombres || '').toString().trim()} ${(u.apellidos || u.apellido || '').toString().trim()}`.trim() ||
                'Agricultor/a',
            }))
        : [];
      const uniq = new Map<string, { email: string; name: string }>();
      for (const r of recipientsRaw) {
        if (!uniq.has(r.email)) uniq.set(r.email, r);
      }
      const recipients = Array.from(uniq.values());

      const reportMessage = weatherReport?.message || 'Alerta meteorológica generada';
      const useN8n = (process.env.USE_N8N_FOR_EMAIL || 'false').toLowerCase() === 'true';
      const payload = {
        tipo: 'clima',
        fecha: new Date().toISOString(),
        descripcion: reportMessage,
        recipients: recipients.map((r) => r.email),
        severity: 'media',
        dedupeKey: `clima|${new Date().toISOString().slice(0, 13)}`,
      };
      if (useN8n) {
        this.logger.log(`Paso 3: Enviando payload a n8n (${recipients.length} destinatarios)...`);
        await this.postToN8n(payload);
      } else {
        this.logger.log(`Paso 3: Enviando emails via notification-service (${recipients.length})...`);
        await Promise.all(
          recipients.map((r) =>
            firstValueFrom(
              this.notificationService.send('send_email', {
                to: r.email,
                name: r.name,
                reportMessage,
              }),
            ),
          ),
        );
      }

      // 4. Éxito completo
      this.logger.log('Alerta climática generada y enviada a n8n exitosamente');
      return {
        success: true,
        message: useN8n ? 'Reporte de clima generado y enviado a n8n' : 'Reporte de clima generado y alertas enviadas via notification-service',
        data: {
          weatherReport: weatherReport.data,
          recipients: recipients.map((r) => r.email)
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