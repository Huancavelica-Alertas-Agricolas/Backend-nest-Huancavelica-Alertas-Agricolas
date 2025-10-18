import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export interface WeatherRecord {
    fecha_hora: string;
    temp_c: number;
    humedad: number;
    clima: string;
    prob_lluvia: number;
    precip_mm: number;
    riesgo_helada?: boolean;
    riesgo_sequia?: boolean;
}
export interface WeatherResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}
export declare class WeatherService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    generateAndSaveWeatherReport(): Promise<WeatherResponse>;
    getCurrentWeatherData(): Promise<WeatherResponse>;
    private fetchAndFilterWeatherData;
    private addRiskAnalysis;
    private generateCsvFromData;
}
