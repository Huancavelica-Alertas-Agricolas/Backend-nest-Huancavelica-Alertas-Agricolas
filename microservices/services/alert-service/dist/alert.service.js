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
var AlertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AlertService = AlertService_1 = class AlertService {
    constructor(weatherService, notificationService, userService) {
        this.weatherService = weatherService;
        this.notificationService = notificationService;
        this.userService = userService;
        this.logger = new common_1.Logger(AlertService_1.name);
    }
    get webhookUrl() {
        return process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/clima-alerta';
    }
    get webhookSecret() {
        return process.env.N8N_WEBHOOK_SECRET;
    }
    async postToN8n(payload) {
        const headers = { 'Content-Type': 'application/json' };
        if (this.webhookSecret)
            headers['x-n8n-signature'] = this.webhookSecret;
        await axios_1.default.post(this.webhookUrl, payload, { headers });
    }
    async processClimateAlert(alertData) {
        this.logger.log(`Procesando alerta puntual: ${JSON.stringify(alertData)}`);
        try {
            const users = await (0, rxjs_1.firstValueFrom)(this.userService.send('get_all_users', {}));
            const recipientsRaw = Array.isArray(users)
                ? users
                    .filter((u) => u?.email && u.email.trim() !== '')
                    .map((u) => ({
                    email: u.email,
                    name: u.nombre || u.nombres || u.name ||
                        `${(u.nombres || '').toString().trim()} ${(u.apellidos || u.apellido || '').toString().trim()}`.trim() ||
                        'Agricultor/a',
                }))
                : [];
            const uniqueMap = new Map();
            for (const r of recipientsRaw) {
                if (!uniqueMap.has(r.email))
                    uniqueMap.set(r.email, r);
            }
            const recipients = Array.from(uniqueMap.values());
            this.logger.log(`📧 Destinatarios encontrados: ${recipients.length}`);
            if (recipients.length === 0) {
                this.logger.warn('⚠️ No hay destinatarios con email válido para enviar la alerta');
            }
            const reportMessage = alertData.descripcion;
            const useN8n = (process.env.USE_N8N_FOR_EMAIL || 'false').toLowerCase() === 'true';
            if (useN8n) {
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
            }
            else {
                try {
                    await Promise.all(recipients.map((r) => (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', {
                        to: r.email,
                        name: r.name,
                        reportMessage,
                    }))));
                    this.logger.log(`📧 Emails de alerta enviados via notification-service a ${recipients.length} destinatarios`);
                }
                catch (e) {
                    this.logger.error(`❌ Error enviando emails via notification-service: ${e.message}`);
                }
            }
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
        }
        catch (error) {
            this.logger.error('Error procesando alerta puntual:', error.stack);
            return {
                success: false,
                message: 'Error procesando alerta puntual',
                error: error.message
            };
        }
    }
    async generateWeatherAlert(alertRequest) {
        this.logger.log(`Generando alerta climática para: ${alertRequest.email}`);
        try {
            this.logger.log('Paso 1: Generando reporte meteorológico...');
            const weatherReport = await (0, rxjs_1.firstValueFrom)(this.weatherService.send('generate_weather_report', {}));
            if (!weatherReport.success) {
                this.logger.warn('El reporte meteorológico falló:', weatherReport.message);
                return {
                    success: false,
                    message: 'Error al generar el reporte meteorológico',
                    error: weatherReport.error || weatherReport.message,
                };
            }
            this.logger.log('Paso 2: Obteniendo destinatarios desde user-service...');
            const users = await (0, rxjs_1.firstValueFrom)(this.userService.send('get_all_users', {}));
            const recipientsRaw = Array.isArray(users)
                ? users
                    .filter((u) => u?.email && (u?.recibe_alertas ?? true))
                    .map((u) => ({
                    email: u.email,
                    name: u.nombre || u.nombres || u.name ||
                        `${(u.nombres || '').toString().trim()} ${(u.apellidos || u.apellido || '').toString().trim()}`.trim() ||
                        'Agricultor/a',
                }))
                : [];
            const uniq = new Map();
            for (const r of recipientsRaw) {
                if (!uniq.has(r.email))
                    uniq.set(r.email, r);
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
            }
            else {
                this.logger.log(`Paso 3: Enviando emails via notification-service (${recipients.length})...`);
                await Promise.all(recipients.map((r) => (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', {
                    to: r.email,
                    name: r.name,
                    reportMessage,
                }))));
            }
            this.logger.log('Alerta climática generada y enviada a n8n exitosamente');
            return {
                success: true,
                message: useN8n ? 'Reporte de clima generado y enviado a n8n' : 'Reporte de clima generado y alertas enviadas via notification-service',
                data: {
                    weatherReport: weatherReport.data,
                    recipients: recipients.map((r) => r.email)
                }
            };
        }
        catch (error) {
            this.logger.error('Error en la orquestación de la alerta climática:', error.stack);
            return {
                success: false,
                message: 'Error interno al generar la alerta climática',
                error: error.message
            };
        }
    }
    async generateFrostAlert(alertRequest) {
        this.logger.log(`Generando alerta de helada para: ${alertRequest.email}`);
        try {
            const weatherData = await (0, rxjs_1.firstValueFrom)(this.weatherService.send('get_weather_data', {}));
            if (!weatherData.success) {
                return {
                    success: false,
                    message: 'Error al obtener datos meteorológicos',
                    error: weatherData.error,
                };
            }
            const frostRisk = weatherData.data?.some((record) => record.riesgo_helada);
            if (!frostRisk) {
                return {
                    success: true,
                    message: 'No se detectó riesgo de helada actual',
                    data: { frostRisk: false }
                };
            }
            const emailResult = await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_email', {
                to: alertRequest.email,
                subject: '🧊 Alerta de Helada - Protege tus Cultivos',
                template: 'weather-alert',
                context: {
                    name: alertRequest.userName,
                    reportMessage: 'Se ha detectado riesgo de helada en las próximas horas. Toma las medidas preventivas necesarias.',
                    date: new Date().toLocaleDateString('es-ES')
                }
            }));
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
        }
        catch (error) {
            this.logger.error('Error generando alerta de helada:', error.stack);
            return {
                success: false,
                message: 'Error interno al generar alerta de helada',
                error: error.message
            };
        }
    }
};
AlertService = AlertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('WEATHER_SERVICE')),
    __param(1, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __param(2, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AlertService);
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map