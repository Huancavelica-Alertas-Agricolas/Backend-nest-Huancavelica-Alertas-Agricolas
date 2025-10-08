"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GatewayController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let GatewayController = GatewayController_1 = class GatewayController {
    constructor(userService, weatherService, notificationService, alertService, logService, preferenceService) {
        this.userService = userService;
        this.weatherService = weatherService;
        this.notificationService = notificationService;
        this.alertService = alertService;
        this.logService = logService;
        this.preferenceService = preferenceService;
        this.logger = new common_1.Logger(GatewayController_1.name);
    }
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
    getHealth() {
        return {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        };
    }
    async createUser(userData) {
        this.logger.log('Creating user via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('create_user', userData));
    }
    async getAllUsers() {
        this.logger.log('Getting all users via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_all_users', {}));
    }
    async getUser(id) {
        this.logger.log(`Getting user ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_user', id));
    }
    async createEstacion(estacionData) {
        this.logger.log('Creating estacion via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('create_estacion', estacionData));
    }
    async getAllEstaciones() {
        this.logger.log('Getting all estaciones via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_all_estaciones', {}));
    }
    async getEstacionesActivas() {
        this.logger.log('Getting active estaciones via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_estaciones_activas', {}));
    }
    async createAlerta(alertaData) {
        this.logger.log('Creating alerta via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('create_alerta', alertaData));
    }
    async getAllAlertas() {
        this.logger.log('Getting all alertas via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_all_alertas', {}));
    }
    async getAlertasActivas() {
        this.logger.log('Getting active alertas via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_alertas_activas', {}));
    }
    async getUserAlertas(id) {
        this.logger.log(`Getting alertas for user ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.userService.send('get_user_alertas', id));
    }
    async generateWeatherReport() {
        this.logger.log('Generating weather report via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.weatherService.send('generate_weather_report', {}));
    }
    async getCurrentWeather() {
        this.logger.log('Getting current weather via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.weatherService.send('get_weather_data', {}));
    }
    async sendEmail(emailData) {
        this.logger.log('Sending email via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', emailData));
    }
    async sendWelcomeEmail(data) {
        this.logger.log('Sending welcome email via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_welcome_email', data));
    }
    async sendWeatherAlert(data) {
        this.logger.log('Sending weather alert email via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_weather_alert', data));
    }
    async sendAlert(data) {
        this.logger.log('Sending weather alert email via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_weather_alert', data));
    }
    async sendClima(data) {
        this.logger.log('Sending clima alert email via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_weather_alert', data));
    }
    async generateWeatherAlert(alertData) {
        this.logger.log('Generating weather alert via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.alertService.send('generate_weather_alert', alertData));
    }
    async legacyGenerateWeatherAlert(alertData) {
        this.logger.log('Legacy: Generating weather alert via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.alertService.send('generate_weather_alert', alertData));
    }
    async sendEmailSimple(emailData) {
        this.logger.log('Sending email via simple endpoint');
        return await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', emailData));
    }
    async createLog(logData) {
        this.logger.log('Creating log via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.logService.send('create_log', logData));
    }
    async getUserLogs(id) {
        this.logger.log(`Getting logs for user ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.logService.send('get_user_logs', { usuarioId: id }));
    }
    async getSystemLogs() {
        this.logger.log('Getting system logs via gateway');
        return await (0, rxjs_1.firstValueFrom)(this.logService.send('get_system_logs', {}));
    }
    async createUserPreference(id, preferenceData) {
        this.logger.log(`Creating preference for user ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.preferenceService.send('create_preference', {
            ...preferenceData,
            usuarioId: id
        }));
    }
    async getUserPreferences(id) {
        this.logger.log(`Getting preferences for user ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.preferenceService.send('get_user_preferences', id));
    }
    async updatePreference(id, preferenceData) {
        this.logger.log(`Updating preference ${id} via gateway`);
        return await (0, rxjs_1.firstValueFrom)(this.preferenceService.send('update_preference', {
            id,
            ...preferenceData
        }));
    }
    async testEmailAlert(alertData) {
        this.logger.log('🧪 Testing email alert system');
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
    async sendRealAlert(alertData) {
        this.logger.log('📧 Sending REAL email alert with template');
        try {
            const result = await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', {
                to: alertData.to || 'aldair456.12358@gmail.com',
                subject: alertData.subject,
                name: alertData.name,
                reportMessage: alertData.reportMessage
            }));
            this.logger.log(`✅ Real email sent successfully: ${JSON.stringify(result)}`);
            return {
                success: true,
                message: `✅ Email REAL enviado a ${alertData.to || 'aldair456.12358@gmail.com'}`,
                timestamp: new Date().toISOString(),
                result: result
            };
        }
        catch (error) {
            this.logger.error(`❌ Error sending real email: ${error.message}`);
            return {
                success: false,
                message: `❌ Error enviando email: ${error.message}`,
                timestamp: new Date().toISOString(),
                error: error.message
            };
        }
    }
    async sendWelcome(welcomeData) {
        this.logger.log('🎉 Sending welcome email with template');
        try {
            const result = await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', {
                to: welcomeData.to,
                name: welcomeData.name,
                subject: welcomeData.subject || '🎉 ¡Bienvenido a Agro-Alertas Huancavelica!',
                template: 'welcome',
                context: {
                    name: welcomeData.name
                }
            }));
            this.logger.log(`✅ Welcome email sent successfully: ${JSON.stringify(result)}`);
            return {
                success: true,
                message: `✅ Email de bienvenida enviado a ${welcomeData.to}`,
                timestamp: new Date().toISOString(),
                template: 'welcome.hbs',
                result: result
            };
        }
        catch (error) {
            this.logger.error(`❌ Error sending welcome email: ${error.message}`);
            return {
                success: false,
                message: `❌ Error enviando email de bienvenida: ${error.message}`,
                timestamp: new Date().toISOString(),
                error: error.message
            };
        }
    }
};
exports.GatewayController = GatewayController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('estaciones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createEstacion", null);
__decorate([
    (0, common_1.Get)('estaciones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getAllEstaciones", null);
__decorate([
    (0, common_1.Get)('estaciones/activas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getEstacionesActivas", null);
__decorate([
    (0, common_1.Post)('alertas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createAlerta", null);
__decorate([
    (0, common_1.Get)('alertas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getAllAlertas", null);
__decorate([
    (0, common_1.Get)('alertas/activas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getAlertasActivas", null);
__decorate([
    (0, common_1.Get)('users/:id/alertas'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUserAlertas", null);
__decorate([
    (0, common_1.Post)('weather/generate-report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "generateWeatherReport", null);
__decorate([
    (0, common_1.Get)('weather/current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getCurrentWeather", null);
__decorate([
    (0, common_1.Post)('notifications/email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('notifications/welcome'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendWelcomeEmail", null);
__decorate([
    (0, common_1.Post)('notifications/weather-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendWeatherAlert", null);
__decorate([
    (0, common_1.Post)('notifications/alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendAlert", null);
__decorate([
    (0, common_1.Post)('notifications/clima'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendClima", null);
__decorate([
    (0, common_1.Post)('alerts/weather'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "generateWeatherAlert", null);
__decorate([
    (0, common_1.Post)('agro-alerts/generate-weather-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "legacyGenerateWeatherAlert", null);
__decorate([
    (0, common_1.Post)('send-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendEmailSimple", null);
__decorate([
    (0, common_1.Post)('logs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createLog", null);
__decorate([
    (0, common_1.Get)('users/:id/logs'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUserLogs", null);
__decorate([
    (0, common_1.Get)('logs/system'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getSystemLogs", null);
__decorate([
    (0, common_1.Post)('users/:id/preferences'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createUserPreference", null);
__decorate([
    (0, common_1.Get)('users/:id/preferences'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUserPreferences", null);
__decorate([
    (0, common_1.Post)('preferences/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updatePreference", null);
__decorate([
    (0, common_1.Post)('test/email-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "testEmailAlert", null);
__decorate([
    (0, common_1.Post)('send-real-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendRealAlert", null);
__decorate([
    (0, common_1.Post)('send-welcome'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendWelcome", null);
exports.GatewayController = GatewayController = GatewayController_1 = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __param(1, (0, common_1.Inject)('WEATHER_SERVICE')),
    __param(2, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __param(3, (0, common_1.Inject)('ALERT_SERVICE')),
    __param(4, (0, common_1.Inject)('LOG_SERVICE')),
    __param(5, (0, common_1.Inject)('PREFERENCE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], GatewayController);
//# sourceMappingURL=gateway.controller.js.map