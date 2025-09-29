import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST') || configService.get<string>('MAIL_HOST') || 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('SMTP_USER') || configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('SMTP_PASS') || configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"${configService.get<string>('MAIL_FROM') || 'Agro-Alertas'}" <${configService.get<string>('SMTP_USER') || configService.get<string>('MAIL_USER')}>`,
        },
        template: {
          dir: '/app/dist/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}