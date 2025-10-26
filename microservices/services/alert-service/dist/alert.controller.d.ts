import { AlertService, AlertRequest, AlertResponse } from './alert.service';
export declare class AlertController {
    private readonly alertService;
    private readonly logger;
    constructor(alertService: AlertService);
    generateWeatherAlert(alertRequest: any): Promise<any>;
    generateFrostAlert(alertRequest: AlertRequest): Promise<AlertResponse>;
    processClimateAlert(alertData: any): Promise<any>;
}
