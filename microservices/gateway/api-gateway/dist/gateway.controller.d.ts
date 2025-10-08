import { ClientProxy } from '@nestjs/microservices';
export declare class GatewayController {
    private userService;
    private weatherService;
    private notificationService;
    private alertService;
    private logService;
    private preferenceService;
    private readonly logger;
    constructor(userService: ClientProxy, weatherService: ClientProxy, notificationService: ClientProxy, alertService: ClientProxy, logService: ClientProxy, preferenceService: ClientProxy);
    getHello(): {
        message: string;
        version: string;
        services: string[];
    };
    getHealth(): {
        status: string;
        timestamp: string;
        uptime: number;
        memory: NodeJS.MemoryUsage;
    };
    createUser(userData: any): Promise<any>;
    getAllUsers(): Promise<any>;
    getUser(id: number): Promise<any>;
    createEstacion(estacionData: any): Promise<any>;
    getAllEstaciones(): Promise<any>;
    getEstacionesActivas(): Promise<any>;
    createAlerta(alertaData: any): Promise<any>;
    getAllAlertas(): Promise<any>;
    getAlertasActivas(): Promise<any>;
    getUserAlertas(id: number): Promise<any>;
    generateWeatherReport(): Promise<any>;
    getCurrentWeather(): Promise<any>;
    sendEmail(emailData: any): Promise<any>;
    sendWelcomeEmail(data: any): Promise<any>;
    sendWeatherAlert(data: any): Promise<any>;
    sendAlert(data: any): Promise<any>;
    sendClima(data: any): Promise<any>;
    generateWeatherAlert(alertData: any): Promise<any>;
    legacyGenerateWeatherAlert(alertData: any): Promise<any>;
    sendEmailSimple(emailData: any): Promise<any>;
    createLog(logData: any): Promise<any>;
    getUserLogs(id: number): Promise<any>;
    getSystemLogs(): Promise<any>;
    createUserPreference(id: number, preferenceData: any): Promise<any>;
    getUserPreferences(id: number): Promise<any>;
    updatePreference(id: number, preferenceData: any): Promise<any>;
    testEmailAlert(alertData: any): Promise<{
        success: boolean;
        message: string;
        alertType: string;
        timestamp: string;
        data: {
            to: any;
            subject: any;
            content: any;
            name: any;
        };
    }>;
    sendRealAlert(alertData: any): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        result: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        timestamp: string;
        error: any;
        result?: undefined;
    }>;
    sendWelcome(welcomeData: any): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        template: string;
        result: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        timestamp: string;
        error: any;
        template?: undefined;
        result?: undefined;
    }>;
}
