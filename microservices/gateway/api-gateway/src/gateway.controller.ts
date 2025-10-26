import { Controller, Get, Post, Body, Inject, Logger, Param } from '@nestjs/common';
import axios from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);

  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('WEATHER_SERVICE') private weatherService: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
    @Inject('ALERT_SERVICE') private alertService: ClientProxy,
    @Inject('LOG_SERVICE') private logService: ClientProxy,
    @Inject('PREFERENCE_SERVICE') private preferenceService: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return { 
      message: 'Agro-Alertas API Gateway',
      version: '2.0.0',
      services: [
        'user-service', 
        'weather-service', 
        'notification-service', 
        'alert-service', 
        'log-service', 
        'preference-service'
      ]
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  // User Service endpoints
  @Post('users')
  async createUser(@Body() userData: any) {
    this.logger.log('Creating user via gateway');
    // Si llega dni desde el frontend, mapear a code
    const payload = {
      ...userData,
      code: userData.code || userData.dni || userData.documento || userData.email,
      ciudad: userData.ciudad || userData.provincia || userData.ubicacion || 'Desconocido',
    };
    // 1) Verificar duplicados de manera preventiva para decidir envío de bienvenida
    let isDuplicate = false;
    try {
      if (payload.email) {
        const existingByEmail = await firstValueFrom(this.userService.send('get_user_by_email', payload.email));
        if (existingByEmail && existingByEmail.id) isDuplicate = true;
      }
      if (!isDuplicate && payload.code) {
        const existingByCode = await firstValueFrom(this.userService.send('get_user_by_code', payload.code));
        if (existingByCode && existingByCode.id) isDuplicate = true;
      }
    } catch (e) {
      this.logger.warn(`No se pudo verificar duplicados antes de crear: ${e.message}`);
    }

    // 2) Crear (idempotente en user-service)
    const created = await firstValueFrom(this.userService.send('create_user', payload));

    // 3) Enviar email de bienvenida solo si no es duplicado y hay email
    if (!isDuplicate && created?.email) {
      const useN8n = (process.env.USE_N8N_FOR_EMAIL || 'false').toLowerCase() === 'true';
      try {
        if (useN8n) {
          // Enviar a n8n por webhook: tipo = welcome
          const webhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/clima-alerta';
          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          const secret = process.env.N8N_WEBHOOK_SECRET;
          if (secret) headers['x-n8n-signature'] = secret;
          await axios.post(webhookUrl, {
            tipo: 'welcome',
            fecha: new Date().toISOString(),
            descripcion: 'Bienvenida a la plataforma Agro-Alertas',
            recipients: [created.email],
            nombre: created.nombre || 'Usuario',
          }, { headers });
          this.logger.log(`Bienvenida enviada a n8n para ${created.email}`);
        } else {
          // Enviar directo por notification-service
          this.logger.log(`Enviando email de bienvenida a ${created.email}`);
          await firstValueFrom(
            this.notificationService.send('send_welcome_email', {
              to: created.email,
              name: created.nombre || 'Usuario',
            }),
          );
        }
      } catch (e) {
        this.logger.error(`Error enviando email de bienvenida: ${e.message}`);
      }
    }

    return created;
  }

  @Get('users')
  async getAllUsers() {
    this.logger.log('Getting all users via gateway');
    return await firstValueFrom(this.userService.send('get_all_users', {}));
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    this.logger.log(`Getting user ${id} via gateway`);
    return await firstValueFrom(this.userService.send('get_user', id));
  }

  // Validaciones de duplicado
  @Get('users/by-code/:code')
  async getUserByCode(@Param('code') code: string) {
    this.logger.log(`Getting user by code ${code} via gateway`);
    return await firstValueFrom(this.userService.send('get_user_by_code', code));
  }

  @Get('users/by-email/:email')
  async getUserByEmail(@Param('email') email: string) {
    this.logger.log(`Getting user by email ${email} via gateway`);
    return await firstValueFrom(this.userService.send('get_user_by_email', email));
  }

  // Estaciones endpoints
  @Post('estaciones')
  async createEstacion(@Body() estacionData: any) {
    this.logger.log('Creating estacion via gateway');
    return await firstValueFrom(this.userService.send('create_estacion', estacionData));
  }

  @Get('estaciones')
  async getAllEstaciones() {
    this.logger.log('Getting all estaciones via gateway');
    return await firstValueFrom(this.userService.send('get_all_estaciones', {}));
  }

  @Get('estaciones/activas')
  async getEstacionesActivas() {
    this.logger.log('Getting active estaciones via gateway');
    return await firstValueFrom(this.userService.send('get_estaciones_activas', {}));
  }

  // Alertas endpoints
  @Post('alertas')
  async createAlerta(@Body() alertaData: any) {
    this.logger.log('Creating alerta via gateway');
    return await firstValueFrom(this.userService.send('create_alerta', alertaData));
  }

  @Get('alertas')
  async getAllAlertas() {
    this.logger.log('Getting all alertas via gateway');
    return await firstValueFrom(this.userService.send('get_all_alertas', {}));
  }

  @Get('alertas/activas')
  async getAlertasActivas() {
    this.logger.log('Getting active alertas via gateway');
    return await firstValueFrom(this.userService.send('get_alertas_activas', {}));
  }

  @Get('users/:id/alertas')
  async getUserAlertas(@Param('id') id: number) {
    this.logger.log(`Getting alertas for user ${id} via gateway`);
    return await firstValueFrom(this.userService.send('get_user_alertas', id));
  }

  // Weather Service endpoints
  @Post('weather/generate-report')
  async generateWeatherReport() {
    this.logger.log('Generating weather report via gateway');
    return await firstValueFrom(this.weatherService.send('generate_weather_report', {}));
  }

  @Get('weather/current')
  async getCurrentWeather() {
    this.logger.log('Getting current weather via gateway');
    return await firstValueFrom(this.weatherService.send('get_weather_data', {}));
  }

  @Get('weather/clima-alerts')
  async getClimateAlerts() {
    this.logger.log('Generating climate alerts via gateway');
    return await firstValueFrom(this.weatherService.send('get_climate_alerts', {}));
  }

  // Notification Service endpoints
  @Post('notifications/email')
  async sendEmail(@Body() emailData: any) {
    this.logger.log('Sending email via gateway');
    return await firstValueFrom(this.notificationService.send('send_email', emailData));
  }

  @Post('notifications/welcome')
  async sendWelcomeEmail(@Body() data: any) {
    this.logger.log('Sending welcome email via gateway');
    return await firstValueFrom(this.notificationService.send('send_welcome_email', data));
  }

  @Post('notifications/weather-alert')
  async sendWeatherAlert(@Body() data: any) {
    this.logger.log('Sending weather alert email via gateway');
    return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
  }

  @Post('notifications/alert')
  async sendAlert(@Body() data: any) {
    this.logger.log('Sending weather alert email via gateway');
    return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
  }

  @Post('notifications/clima')
  async sendClima(@Body() data: any) {
    this.logger.log('Sending clima alert email via gateway');
    return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
  }

  // Alert Service endpoints (Orchestrator)
  @Post('alerts/weather')
  async generateWeatherAlert(@Body() alertData: any) {
    this.logger.log('Generating weather alert via gateway');
    return await firstValueFrom(this.alertService.send('generate_weather_alert', alertData));
  }

  @Post('alerts/test-climate')
  async testClimateAlert() {
    this.logger.log('Testing climate alert system');
    
    // Generar una alerta de prueba que active el flujo completo
    const testAlertData = {
      tipo: 'helada',
      fecha: new Date().toISOString(),
      descripcion: '⚠️ PRUEBA: Alerta de helada detectada. Temperaturas mínimas esperadas entre -2°C y 2°C en las próximas 24 horas.'
    };
    
    return await firstValueFrom(this.alertService.send('generate_weather_alert', testAlertData));
  }

  // Legacy endpoint from original project
  @Post('agro-alerts/generate-weather-alert')
  async legacyGenerateWeatherAlert(@Body() alertData: any) {
    this.logger.log('Legacy: Generating weather alert via gateway');
    return await firstValueFrom(this.alertService.send('generate_weather_alert', alertData));
  }

  // Simple endpoint for easy email testing
  @Post('send-email')
  async sendEmailSimple(@Body() emailData: any) {
    this.logger.log('Sending email via simple endpoint');
    return await firstValueFrom(this.notificationService.send('send_email', emailData));
  }

  // Log Service endpoints
  @Post('logs')
  async createLog(@Body() logData: any) {
    this.logger.log('Creating log via gateway');
    return await firstValueFrom(this.logService.send('create_log', logData));
  }

  @Get('users/:id/logs')
  async getUserLogs(@Param('id') id: number) {
    this.logger.log(`Getting logs for user ${id} via gateway`);
    return await firstValueFrom(this.logService.send('get_user_logs', { usuarioId: id }));
  }

  @Get('logs/system')
  async getSystemLogs() {
    this.logger.log('Getting system logs via gateway');
    return await firstValueFrom(this.logService.send('get_system_logs', {}));
  }

  // Preference Service endpoints
  @Post('users/:id/preferences')
  async createUserPreference(@Param('id') id: number, @Body() preferenceData: any) {
    this.logger.log(`Creating preference for user ${id} via gateway`);
    return await firstValueFrom(this.preferenceService.send('create_preference', { 
      ...preferenceData, 
      usuarioId: id 
    }));
  }

  @Get('users/:id/preferences')
  async getUserPreferences(@Param('id') id: number) {
    this.logger.log(`Getting preferences for user ${id} via gateway`);
    return await firstValueFrom(this.preferenceService.send('get_user_preferences', id));
  }

  @Post('preferences/:id')
  async updatePreference(@Param('id') id: number, @Body() preferenceData: any) {
    this.logger.log(`Updating preference ${id} via gateway`);
    return await firstValueFrom(this.preferenceService.send('update_preference', { 
      id, 
      ...preferenceData 
    }));
  }

  // Test endpoints para demo
  @Post('test/email-alert')
  async testEmailAlert(@Body() alertData: any) {
    this.logger.log('🧪 Testing email alert system');
    
    // Simular respuesta exitosa para propósitos de demo
    const simulatedAlert = {
      success: true,
      message: `✅ SIMULACIÓN: Alerta enviada exitosamente a ${alertData.to}`,
      alertType: alertData.reportMessage ? 'weather-alert' : 'general',
      timestamp: new Date().toISOString(),
      data: {
        to: alertData.to,
        subject: alertData.subject,
        content: alertData.reportMessage || alertData.text || 'Alerta general',
        name: alertData.name || 'Usuario'
      }
    };

    this.logger.log(`📧 DEMO EMAIL ALERT: ${JSON.stringify(simulatedAlert, null, 2)}`);
    
    return simulatedAlert;
  }

  // Endpoint para envío real con plantillas
  @Post('send-real-alert')
  async sendRealAlert(@Body() alertData: any) {
    this.logger.log('📧 Sending REAL email alert with template');
    
    try {
      // Usar el servicio de notificaciones real
      const result = await firstValueFrom(
        this.notificationService.send('send_email', {
          to: alertData.to || 'aldair456.12358@gmail.com',
          subject: alertData.subject,
          name: alertData.name,
          reportMessage: alertData.reportMessage
        })
      );
      
      this.logger.log(`✅ Real email sent successfully: ${JSON.stringify(result)}`);
      return {
        success: true,
        message: `✅ Email REAL enviado a ${alertData.to || 'aldair456.12358@gmail.com'}`,
        timestamp: new Date().toISOString(),
        result: result
      };
    } catch (error) {
      this.logger.error(`❌ Error sending real email: ${error.message}`);
      return {
        success: false,
        message: `❌ Error enviando email: ${error.message}`,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }

  // Endpoint específico para email de bienvenida
  @Post('send-welcome')
  async sendWelcome(@Body() welcomeData: any) {
    this.logger.log('🎉 Sending welcome email with template');
    
    try {
      const result = await firstValueFrom(
        this.notificationService.send('send_email', {
          to: welcomeData.to,
          name: welcomeData.name,
          subject: welcomeData.subject || '🎉 ¡Bienvenido a Agro-Alertas Huancavelica!',
          template: 'welcome',
          context: {
            name: welcomeData.name
          }
        })
      );
      
      this.logger.log(`✅ Welcome email sent successfully: ${JSON.stringify(result)}`);
      return {
        success: true,
        message: `✅ Email de bienvenida enviado a ${welcomeData.to}`,
        timestamp: new Date().toISOString(),
        template: 'welcome.hbs',
        result: result
      };
    } catch (error) {
      this.logger.error(`❌ Error sending welcome email: ${error.message}`);
      return {
        success: false,
        message: `❌ Error enviando email de bienvenida: ${error.message}`,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }
}