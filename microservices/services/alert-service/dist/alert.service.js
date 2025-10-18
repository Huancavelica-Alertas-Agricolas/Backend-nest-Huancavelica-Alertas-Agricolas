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
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AlertService = AlertService_1 = class AlertService {
    constructor(weatherService, notificationService) {
        this.weatherService = weatherService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(AlertService_1.name);
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
            this.logger.log('Paso 2: Enviando alerta por email...');
            const emailResult = await (0, rxjs_1.firstValueFrom)(this.notificationService.send('send_weather_alert', {
                to: alertRequest.email,
                name: alertRequest.userName,
                reportMessage: weatherReport.message
            }));
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
exports.AlertService = AlertService;
exports.AlertService = AlertService = AlertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('WEATHER_SERVICE')),
    __param(1, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AlertService);
//# sourceMappingURL=alert.service.js.map