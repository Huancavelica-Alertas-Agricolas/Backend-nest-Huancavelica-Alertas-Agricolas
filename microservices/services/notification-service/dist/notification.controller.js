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
var NotificationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const notification_service_1 = require("./notification.service");
let NotificationController = NotificationController_1 = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(NotificationController_1.name);
    }
    async sendEmail(emailData) {
        this.logger.log('Procesando solicitud de envío de email');
        this.logger.log(`Datos recibidos: ${JSON.stringify(emailData)}`);
        const { to, subject, template, context, text, name, reportMessage } = emailData;
        this.logger.log(`Variables extraídas - name: ${name}, reportMessage: ${reportMessage}, text: ${text}`);
        if (name && reportMessage) {
            this.logger.log('Detectado: Alerta meteorológica');
            return await this.notificationService.sendWeatherAlert(to, name, reportMessage);
        }
        if (name && !reportMessage && !text) {
            this.logger.log('Detectado: Email de bienvenida');
            return await this.notificationService.sendWelcomeEmail(to, name);
        }
        if (template && context) {
            this.logger.log(`Usando template específico: ${template}`);
            return await this.notificationService.sendEmail(to, subject, template, context);
        }
        if (text) {
            this.logger.log('Enviando email de texto plano');
            return await this.notificationService.sendPlainTextEmail(to, subject, text);
        }
        return {
            success: false,
            message: 'No se pudo determinar el tipo de email. Proporciona: name+reportMessage (alerta), name (bienvenida), o text (texto plano)',
            error: 'Invalid email data'
        };
    }
    async sendWelcomeEmail(data) {
        this.logger.log('Procesando solicitud de email de bienvenida');
        this.logger.log(`Datos recibidos en sendWelcomeEmail: ${JSON.stringify(data)}`);
        const { to, email, name, reportMessage } = data;
        const recipient = to || email;
        this.logger.log(`Destinatario: ${recipient}, Nombre: ${name}`);
        if (reportMessage) {
            return await this.notificationService.sendWeatherAlert(recipient, name, reportMessage);
        }
        return await this.notificationService.sendWelcomeEmail(recipient, name);
    }
    async sendWeatherAlert(data) {
        this.logger.log('Procesando solicitud de alerta meteorológica');
        const { to, name, reportMessage } = data;
        return await this.notificationService.sendWeatherAlert(to, name, reportMessage);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, microservices_1.MessagePattern)('send_email'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('send_welcome_email'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendWelcomeEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('send_weather_alert'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendWeatherAlert", null);
exports.NotificationController = NotificationController = NotificationController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map