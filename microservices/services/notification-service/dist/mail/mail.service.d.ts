import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendMail(to: string, subject: string, template: string, context: object): Promise<void>;
    sendPlainTextMail(to: string, subject: string, text: string): Promise<void>;
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendWeatherAlert(to: string, name: string, reportMessage: string): Promise<void>;
}
