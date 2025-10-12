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
var WeatherController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const weather_service_1 = require("./weather.service");
let WeatherController = WeatherController_1 = class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
        this.logger = new common_1.Logger(WeatherController_1.name);
    }
    async generateWeatherReport() {
        this.logger.log('Generando reporte meteorológico...');
        return await this.weatherService.generateAndSaveWeatherReport();
    }
    async getWeatherData() {
        this.logger.log('Obteniendo datos meteorológicos...');
        return await this.weatherService.getCurrentWeatherData();
    }
};
exports.WeatherController = WeatherController;
__decorate([
    (0, microservices_1.MessagePattern)('generate_weather_report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "generateWeatherReport", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_weather_data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "getWeatherData", null);
exports.WeatherController = WeatherController = WeatherController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherController);
//# sourceMappingURL=weather.controller.js.map