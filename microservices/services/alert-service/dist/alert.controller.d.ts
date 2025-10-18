import { AlertService, AlertRequest, AlertResponse } from './alert.service';
export declare class AlertController {
    private readonly alertService;
    private readonly logger;
    constructor(alertService: AlertService);
    generateWeatherAlert(alertRequest: AlertRequest): Promise<AlertResponse>;
    generateFrostAlert(alertRequest: AlertRequest): Promise<AlertResponse>;
}
