import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: object,        
  ): Promise<void> {
    try {
      this.logger.log(`Enviando email a: ${to} con template: ${template}`);
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
      this.logger.log(`Email enviado exitosamente a: ${to}`);
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}:`, error.stack);
      throw error;
    }
  }

  async sendPlainTextMail(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    try {
      this.logger.log(`Enviando email de texto plano a: ${to}`);
      
      // Crear transporter directamente con nodemailer para evitar problemas con Handlebars
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
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}:`, error.stack);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    this.logger.log('🎯 EJECUTANDO sendWelcomeEmail - MÉTODO ESPECÍFICO');
    
    // Si el nombre contiene "ALERTA", usar la plantilla de alerta
    if (name && name.includes('ALERTA')) {
      const reportMessage = name.split(' - ')[1] || 'Condiciones climáticas adversas detectadas';
      const cleanName = name.split(' - ')[0];
      this.logger.log('🌦️ Detectada palabra ALERTA - usando plantilla meteorológica');
      return await this.sendWeatherAlert(to, cleanName, reportMessage);
    }
    
    await this.sendMail(
      to,
      'Bienvenido a Agro-Alertas',
      'welcome',
      { name }
    );
  }

  async sendWeatherAlert(to: string, name: string, reportMessage: string): Promise<void> {
    try {
      this.logger.log(`🌦️ Enviando alerta meteorológica a: ${to}`);
      
      // Crear transporter directamente con nodemailer
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // Leer la plantilla weather-alert.hbs
      const fs = require('fs');
      const path = require('path');
      const handlebars = require('handlebars');
      
      const templatePath = path.join(__dirname, 'templates', 'weather-alert.hbs');
      let templateContent = '';
      
      try {
        templateContent = fs.readFileSync(templatePath, 'utf8');
      } catch (error) {
        // Si no encuentra la plantilla en esa ubicación, probar en /app/dist/templates/
        const alternativePath = '/app/dist/templates/weather-alert.hbs';
        templateContent = fs.readFileSync(alternativePath, 'utf8');
      }
      
      // Compilar la plantilla con los datos
      const template = handlebars.compile(templateContent);
      const htmlContent = template({
        name: name,
        reportMessage: reportMessage,
        date: new Date().toLocaleDateString('es-ES')
      });

      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_USER}>`,
        to,
        subject: 'Alerta Climática - Agro-Alertas',
        html: htmlContent,
      });
      
      this.logger.log(`🌦️ Alerta meteorológica enviada exitosamente a: ${to}`);
    } catch (error) {
      this.logger.error(`Error enviando alerta meteorológica a ${to}:`, error.stack);
      throw error;
    }
  }
}