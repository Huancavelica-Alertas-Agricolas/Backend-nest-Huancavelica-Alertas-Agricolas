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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail/mail.service");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(mailService) {
        this.mailService = mailService;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async sendEmail(to, subject, template, context) {
        try {
            await this.mailService.sendMail(to, subject, template, context);
            return {
                success: true,
                message: `Email enviado exitosamente a ${to}`,
            };
        }
        catch (error) {
            this.logger.error(`Error enviando email a ${to}:`, error.stack);
            return {
                success: false,
                message: `Error enviando email a ${to}`,
                error: error.message,
            };
        }
    }
    async sendPlainTextEmail(to, subject, text) {
        try {
            await this.mailService.sendPlainTextMail(to, subject, text);
            return {
                success: true,
                message: `Email enviado exitosamente a ${to}`,
            };
        }
        catch (error) {
            this.logger.error(`Error enviando email a ${to}:`, error.stack);
            return {
                success: false,
                message: `Error enviando email a ${to}`,
                error: error.message,
            };
        }
    }
    async sendWelcomeEmail(to, name) {
        try {
            await this.mailService.sendWelcomeEmail(to, name);
            return {
                success: true,
                message: `Email de bienvenida enviado exitosamente a ${to}`,
            };
        }
        catch (error) {
            this.logger.error(`Error enviando email de bienvenida a ${to}:`, error.stack);
            return {
                success: false,
                message: `Error enviando email de bienvenida a ${to}`,
                error: error.message,
            };
        }
    }
    async sendWeatherAlert(to, name, reportMessage) {
        try {
            await this.mailService.sendWeatherAlert(to, name, reportMessage);
            return {
                success: true,
                message: `Alerta meteorológica enviada exitosamente a ${to}`,
            };
        }
        catch (error) {
            this.logger.error(`Error enviando alerta meteorológica a ${to}:`, error.stack);
            return {
                success: false,
                message: `Error enviando alerta meteorológica a ${to}`,
                error: error.message,
            };
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map