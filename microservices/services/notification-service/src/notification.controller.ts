import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService, NotificationResponse } from './notification.service';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('send_email')
  async sendEmail(@Payload() emailData: any): Promise<NotificationResponse> {
    this.logger.log('Procesando solicitud de envío de email');
    this.logger.log(`Datos recibidos: ${JSON.stringify(emailData)}`);
    const { to, subject, template, context, text, name, reportMessage } = emailData;
    
    this.logger.log(`Variables extraídas - name: ${name}, reportMessage: ${reportMessage}, text: ${text}`);
    
    // Auto-detectar tipo de email basado en los campos
    if (name && reportMessage) {
      // Es una alerta meteorológica
      this.logger.log('Detectado: Alerta meteorológica');
      return await this.notificationService.sendWeatherAlert(to, name, reportMessage);
    }
    
    if (name && !reportMessage && !text) {
      // Es un email de bienvenida
      this.logger.log('Detectado: Email de bienvenida');
      return await this.notificationService.sendWelcomeEmail(to, name);
    }
    
    // Si se proporciona template específico, usarlo
    if (template && context) {
      this.logger.log(`Usando template específico: ${template}`);
      return await this.notificationService.sendEmail(to, subject, template, context);
    }
    
    // Si se proporciona solo texto plano, usar el método de texto plano
    if (text) {
      this.logger.log('Enviando email de texto plano');
      return await this.notificationService.sendPlainTextEmail(to, subject, text);
    }
    
    // Si no se puede determinar el tipo, enviar error
    return {
      success: false,
      message: 'No se pudo determinar el tipo de email. Proporciona: name+reportMessage (alerta), name (bienvenida), o text (texto plano)',
      error: 'Invalid email data'
    };
  }

  @MessagePattern('send_welcome_email')
  async sendWelcomeEmail(@Payload() data: any): Promise<NotificationResponse> {
    this.logger.log('Procesando solicitud de email de bienvenida');
    this.logger.log(`Datos recibidos en sendWelcomeEmail: ${JSON.stringify(data)}`);
    const { to, email, name, reportMessage } = data;
    const recipient = to || email; // Usar 'to' o 'email' como destinatario
    this.logger.log(`Destinatario: ${recipient}, Nombre: ${name}`);
    
    // Si hay reportMessage, es una alerta meteorológica
    if (reportMessage) {
      return await this.notificationService.sendWeatherAlert(recipient, name, reportMessage);
    }
    
    return await this.notificationService.sendWelcomeEmail(recipient, name);
  }

  @MessagePattern('send_weather_alert')
  async sendWeatherAlert(@Payload() data: any): Promise<NotificationResponse> {
    this.logger.log('Procesando solicitud de alerta meteorológica');
    const { to, name, reportMessage } = data;
    return await this.notificationService.sendWeatherAlert(to, name, reportMessage);
  }
}