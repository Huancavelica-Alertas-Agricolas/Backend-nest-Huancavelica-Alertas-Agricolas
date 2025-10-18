import { WeatherService, WeatherResponse } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    private readonly logger;
    constructor(weatherService: WeatherService);
    generateWeatherReport(): Promise<WeatherResponse>;
    getWeatherData(): Promise<WeatherResponse>;
}
