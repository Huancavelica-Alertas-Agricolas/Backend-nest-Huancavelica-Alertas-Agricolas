"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WeatherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const json2csv_1 = require("json2csv");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fs_1 = require("fs");
let WeatherService = WeatherService_1 = class WeatherService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(WeatherService_1.name);
    }
    async generateAndSaveWeatherReport() {
        this.logger.log('Iniciando la generación del reporte de clima...');
        try {
            const registros = await this.fetchAndFilterWeatherData();
            if (registros.length === 0) {
                this.logger.warn('No se encontraron registros de lluvia.');
                return {
                    success: false,
                    message: 'No se encontraron datos de lluvia para generar el reporte.',
                };
            }
            const registrosConAnalisis = this.addRiskAnalysis(registros);
            const csv = this.generateCsvFromData(registrosConAnalisis);
            const reportsDir = (0, path_1.join)(process.cwd(), 'reports');
            if (!(0, fs_1.existsSync)(reportsDir)) {
                await (0, promises_1.mkdir)(reportsDir, { recursive: true });
            }
            const filePath = (0, path_1.join)(reportsDir, 'clima_huancavelica.csv');
            await (0, promises_1.writeFile)(filePath, csv);
            this.logger.log(`Reporte guardado exitosamente en: ${filePath}`);
            return {
                success: true,
                message: `Reporte generado y guardado exitosamente`,
                data: {
                    filePath,
                    recordCount: registrosConAnalisis.length,
                    records: registrosConAnalisis,
                },
            };
        }
        catch (error) {
            this.logger.error('Error al generar el reporte de clima', error.stack);
            return {
                success: false,
                message: 'Error al generar el reporte de clima',
                error: error.message,
            };
        }
    }
    async getCurrentWeatherData() {
        this.logger.log('Obteniendo datos meteorológicos actuales...');
        try {
            const registros = await this.fetchAndFilterWeatherData();
            const registrosConAnalisis = this.addRiskAnalysis(registros);
            return {
                success: true,
                message: 'Datos meteorológicos obtenidos exitosamente',
                data: registrosConAnalisis,
            };
        }
        catch (error) {
            this.logger.error('Error al obtener datos meteorológicos', error.stack);
            return {
                success: false,
                message: 'Error al obtener datos meteorológicos',
                error: error.message,
            };
        }
    }
    async fetchAndFilterWeatherData() {
        const apiKey = this.configService.get('API_KEY');
        const lat = -12.7861;
        const lon = -74.9723;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const data = response.data;
            const forecastDays = data.forecast?.forecastday || [];
            return forecastDays.flatMap((dia) => dia.hour
                .filter((hora) => hora.will_it_rain === 1)
                .map((hora) => ({
                fecha_hora: hora.time,
                temp_c: hora.temp_c,
                humedad: hora.humidity,
                clima: hora.condition?.text || '',
                prob_lluvia: hora.will_it_rain,
                precip_mm: hora.precip_mm,
            })));
        }
        catch (error) {
            this.logger.error('Error al obtener datos de la API del clima', error.stack);
            throw new Error('No se pudieron obtener los datos meteorológicos');
        }
    }
    addRiskAnalysis(registros) {
        return registros.map((reg) => ({
            ...reg,
            riesgo_helada: reg.temp_c <= 0,
            riesgo_sequia: reg.precip_mm < 1 && reg.humedad < 40,
        }));
    }
    generateCsvFromData(data) {
        const json2csvParser = new json2csv_1.Parser();
        return json2csvParser.parse(data);
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = WeatherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map