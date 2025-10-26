import { ClientProxy } from '@nestjs/microservices';
export interface AlertRequest {
    email: string;
    userName: string;
    type?: 'weather' | 'frost' | 'drought';
}
export interface AlertResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}
export declare class AlertService {
    private weatherService;
    private notificationService;
    private userService;
    private readonly logger;
    constructor(weatherService: ClientProxy, notificationService: ClientProxy, userService: ClientProxy);
    private get webhookUrl();
    private get webhookSecret();
    private postToN8n;
    processClimateAlert(alertData: {
        tipo: string;
        fecha?: string;
        descripcion: string;
    }): Promise<any>;
    generateWeatherAlert(alertRequest: AlertRequest): Promise<AlertResponse>;
    generateFrostAlert(alertRequest: AlertRequest): Promise<AlertResponse>;
}
