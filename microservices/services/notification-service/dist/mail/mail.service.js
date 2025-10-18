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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = MailService_1 = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async sendMail(to, subject, template, context) {
        try {
            this.logger.log(`Enviando email a: ${to} con template: ${template}`);
            await this.mailerService.sendMail({
                to,
                subject,
                template,
                context,
            });
            this.logger.log(`Email enviado exitosamente a: ${to}`);
        }
        catch (error) {
            this.logger.error(`Error enviando email a ${to}:`, error.stack);
            throw error;
        }
    }
    async sendPlainTextMail(to, subject, text) {
        try {
            this.logger.log(`Enviando email de texto plano a: ${to}`);
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST || 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_USER}>`,
                to,
                subject,
                text,
            });
            this.logger.log(`Email enviado exitosamente a: ${to}`);
        }
        catch (error) {
            this.logger.error(`Error enviando email a ${to}:`, error.stack);
            throw error;
        }
    }
    async sendWelcomeEmail(to, name) {
        this.logger.log('🎯 EJECUTANDO sendWelcomeEmail - MÉTODO ESPECÍFICO');
        if (name && name.includes('ALERTA')) {
            const reportMessage = name.split(' - ')[1] || 'Condiciones climáticas adversas detectadas';
            const cleanName = name.split(' - ')[0];
            this.logger.log('🌦️ Detectada palabra ALERTA - usando plantilla meteorológica');
            return await this.sendWeatherAlert(to, cleanName, reportMessage);
        }
        await this.sendMail(to, 'Bienvenido a Agro-Alertas', 'welcome', { name });
    }
    async sendWeatherAlert(to, name, reportMessage) {
        try {
            this.logger.log(`🌦️ Enviando alerta meteorológica a: ${to} usando plantilla weather-alert`);
            await this.mailerService.sendMail({
                to,
                subject: '🌦️ Alerta Climática - Agro-Alertas Huancavelica',
                template: 'weather-alert',
                context: {
                    name: name,
                    reportMessage: reportMessage,
                    date: new Date().toLocaleDateString('es-ES'),
                    time: new Date().toLocaleTimeString('es-ES'),
                    location: 'Huancavelica'
                },
            });
            this.logger.log(`🌦️ Alerta meteorológica con plantilla enviada exitosamente a: ${to}`);
        }
        catch (error) {
            this.logger.error(`Error enviando alerta meteorológica a ${to}:`, error.stack);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map