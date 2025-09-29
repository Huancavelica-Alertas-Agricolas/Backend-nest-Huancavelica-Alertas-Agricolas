import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './mail/mail.service';

export interface NotificationResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly mailService: MailService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: any
  ): Promise<NotificationResponse> {
    try {
      await this.mailService.sendMail(to, subject, template, context);
      return {
        success: true,
        message: `Email enviado exitosamente a ${to}`,
      };
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}:`, error.stack);
      return {
        success: false,
        message: `Error enviando email a ${to}`,
        error: error.message,
      };
    }
  }

  async sendPlainTextEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<NotificationResponse> {
    try {
      await this.mailService.sendPlainTextMail(to, subject, text);
      return {
        success: true,
        message: `Email enviado exitosamente a ${to}`,
      };
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}:`, error.stack);
      return {
        success: false,
        message: `Error enviando email a ${to}`,
        error: error.message,
      };
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<NotificationResponse> {
    try {
      await this.mailService.sendWelcomeEmail(to, name);
      return {
        success: true,
        message: `Email de bienvenida enviado exitosamente a ${to}`,
      };
    } catch (error) {
      this.logger.error(`Error enviando email de bienvenida a ${to}:`, error.stack);
      return {
        success: false,
        message: `Error enviando email de bienvenida a ${to}`,
        error: error.message,
      };
    }
  }

  async sendWeatherAlert(to: string, name: string, reportMessage: string): Promise<NotificationResponse> {
    try {
      await this.mailService.sendWeatherAlert(to, name, reportMessage);
      return {
        success: true,
        message: `Alerta meteorológica enviada exitosamente a ${to}`,
      };
    } catch (error) {
      this.logger.error(`Error enviando alerta meteorológica a ${to}:`, error.stack);
      return {
        success: false,
        message: `Error enviando alerta meteorológica a ${to}`,
        error: error.message,
      };
    }
  }
}