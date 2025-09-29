import { Controller, Get, Post, Body, Inject, Logger, Param } from '@nestjs/common';
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

  // User Service endpoints
  @Post('users')
  async createUser(@Body() userData: any) {
    this.logger.log('Creating user via gateway');
    return await firstValueFrom(this.userService.send('create_user', userData));
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
}