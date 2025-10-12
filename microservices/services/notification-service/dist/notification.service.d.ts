import { MailService } from './mail/mail.service';
export interface NotificationResponse {
    success: boolean;
    message: string;
    error?: string;
}
export declare class NotificationService {
    private readonly mailService;
    private readonly logger;
    constructor(mailService: MailService);
    sendEmail(to: string, subject: string, template: string, context: any): Promise<NotificationResponse>;
    sendPlainTextEmail(to: string, subject: string, text: string): Promise<NotificationResponse>;
    sendWelcomeEmail(to: string, name: string): Promise<NotificationResponse>;
    sendWeatherAlert(to: string, name: string, reportMessage: string): Promise<NotificationResponse>;
}
