import { NotificationService, NotificationResponse } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    private readonly logger;
    constructor(notificationService: NotificationService);
    sendEmail(emailData: any): Promise<NotificationResponse>;
    sendWelcomeEmail(data: any): Promise<NotificationResponse>;
    sendWeatherAlert(data: any): Promise<NotificationResponse>;
}
