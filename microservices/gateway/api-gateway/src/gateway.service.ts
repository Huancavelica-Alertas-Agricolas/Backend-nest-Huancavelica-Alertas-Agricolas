import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
	private readonly logger = new Logger(GatewayService.name);

	constructor(
		@Inject('USER_SERVICE') private userService: ClientProxy,
		@Inject('WEATHER_SERVICE') private weatherService: ClientProxy,
		@Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
		@Inject('ALERT_SERVICE') private alertService: ClientProxy,
		@Inject('LOG_SERVICE') private logService: ClientProxy,
		@Inject('PREFERENCE_SERVICE') private preferenceService: ClientProxy,
	) {}

	async getHello() {
		return {
			message: 'Agro-Alertas API Gateway',
			version: '2.0.0',
			services: [
				'user-service',
				'weather-service',
				'notification-service',
				'alert-service',
				'log-service',
				'preference-service',
			],
		};
	}

	async getHealth() {
		return {
			status: 'OK',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			memory: process.memoryUsage(),
		};
	}

	async createUser(userData: any) {
		this.logger.log('Creating user via gateway');
		const payload = {
			...userData,
			code: userData.code || userData.dni || userData.documento || userData.email,
			ciudad: userData.ciudad || userData.provincia || userData.ubicacion || 'Desconocido',
		};
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
		const created = await firstValueFrom(this.userService.send('create_user', payload));
		if (!isDuplicate && created?.email) {
			try {
				await firstValueFrom(
					this.notificationService.send('send_welcome_email', {
						to: created.email,
						name: created.nombre || 'Usuario',
					}),
				);
			} catch (e) {
				this.logger.error(`Error enviando email de bienvenida: ${e.message}`);
			}
		}
		return created;
	}

	async getAllUsers() {
		return await firstValueFrom(this.userService.send('get_all_users', {}));
	}

	async getUser(id: number) {
		return await firstValueFrom(this.userService.send('get_user', id));
	}

	async getUserByCode(code: string) {
		return await firstValueFrom(this.userService.send('get_user_by_code', code));
	}

	async getUserByEmail(email: string) {
		return await firstValueFrom(this.userService.send('get_user_by_email', email));
	}

	async createEstacion(estacionData: any) {
		return await firstValueFrom(this.userService.send('create_estacion', estacionData));
	}

	async getAllEstaciones() {
		return await firstValueFrom(this.userService.send('get_all_estaciones', {}));
	}

	async getEstacionesActivas() {
		return await firstValueFrom(this.userService.send('get_estaciones_activas', {}));
	}

	async createAlerta(alertaData: any) {
		return await firstValueFrom(this.userService.send('create_alerta', alertaData));
	}

	async getAllAlertas() {
		return await firstValueFrom(this.userService.send('get_all_alertas', {}));
	}

	async getAlertasActivas() {
		return await firstValueFrom(this.userService.send('get_alertas_activas', {}));
	}

	async getUserAlertas(id: number) {
		return await firstValueFrom(this.userService.send('get_user_alertas', id));
	}

	async generateWeatherReport() {
		return await firstValueFrom(this.weatherService.send('generate_weather_report', {}));
	}

	async getCurrentWeather() {
		return await firstValueFrom(this.weatherService.send('get_weather_data', {}));
	}

	async getClimateAlerts() {
		return await firstValueFrom(this.weatherService.send('get_climate_alerts', {}));
	}

	async sendEmail(emailData: any) {
		return await firstValueFrom(this.notificationService.send('send_email', emailData));
	}

	async sendWelcomeEmail(data: any) {
		return await firstValueFrom(this.notificationService.send('send_welcome_email', data));
	}

	async sendWeatherAlert(data: any) {
		return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
	}

	async sendAlert(data: any) {
		return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
	}

	async sendClima(data: any) {
		return await firstValueFrom(this.notificationService.send('send_weather_alert', data));
	}

	async generateWeatherAlertOrchestrator(alertData: any) {
		return await firstValueFrom(this.alertService.send('generate_weather_alert', alertData));
	}

	async testClimateAlert() {
		const testAlertData = {
			tipo: 'helada',
			fecha: new Date().toISOString(),
			descripcion: '⚠️ PRUEBA: Alerta de helada detectada. Temperaturas mínimas esperadas entre -2°C y 2°C en las próximas 24 horas.',
		};
		return await firstValueFrom(this.alertService.send('generate_weather_alert', testAlertData));
	}

	async legacyGenerateWeatherAlert(alertData: any) {
		return await firstValueFrom(this.alertService.send('generate_weather_alert', alertData));
	}

	async sendEmailSimple(emailData: any) {
		return await firstValueFrom(this.notificationService.send('send_email', emailData));
	}

	async createLog(logData: any) {
		return await firstValueFrom(this.logService.send('create_log', logData));
	}

	async getUserLogs(id: number) {
		return await firstValueFrom(this.logService.send('get_user_logs', { usuarioId: id }));
	}

	async getSystemLogs() {
		return await firstValueFrom(this.logService.send('get_system_logs', {}));
	}

	async createUserPreference(id: number, preferenceData: any) {
		return await firstValueFrom(this.preferenceService.send('create_preference', { ...preferenceData, usuarioId: id }));
	}

	async getUserPreferences(id: number) {
		return await firstValueFrom(this.preferenceService.send('get_user_preferences', id));
	}

	async updatePreference(id: number, preferenceData: any) {
		return await firstValueFrom(this.preferenceService.send('update_preference', { id, ...preferenceData }));
	}
}
