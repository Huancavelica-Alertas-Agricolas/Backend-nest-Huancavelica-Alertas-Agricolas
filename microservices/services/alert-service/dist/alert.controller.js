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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AlertController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const alert_service_1 = require("./alert.service");
let AlertController = AlertController_1 = class AlertController {
    constructor(alertService) {
        this.alertService = alertService;
        this.logger = new common_1.Logger(AlertController_1.name);
    }
    async generateWeatherAlert(alertRequest) {
        this.logger.log('Procesando solicitud de alerta meteorológica:', alertRequest);
        return await this.alertService.processClimateAlert(alertRequest);
    }
    async generateFrostAlert(alertRequest) {
        this.logger.log('Procesando solicitud de alerta de helada:', alertRequest);
        return await this.alertService.generateFrostAlert(alertRequest);
    }
    async processClimateAlert(alertData) {
        this.logger.log('Procesando alerta climática desde weather-service:', alertData);
        return await this.alertService.processClimateAlert(alertData);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('generate_weather_alert'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertController.prototype, "generateWeatherAlert", null);
__decorate([
    (0, microservices_1.MessagePattern)('generate_frost_alert'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertController.prototype, "generateFrostAlert", null);
__decorate([
    (0, microservices_1.MessagePattern)('process_climate_alert'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertController.prototype, "processClimateAlert", null);
AlertController = AlertController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [alert_service_1.AlertService])
], AlertController);
exports.AlertController = AlertController;
//# sourceMappingURL=alert.controller.js.map