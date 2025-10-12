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
var LogController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const log_service_1 = require("./log.service");
let LogController = LogController_1 = class LogController {
    constructor(logService) {
        this.logService = logService;
        this.logger = new common_1.Logger(LogController_1.name);
    }
    async createLog(logData) {
        this.logger.log('Creando log:', logData);
        return await this.logService.createLog(logData);
    }
    async getUserLogs(data) {
        this.logger.log(`Obteniendo logs para usuario: ${data.usuarioId}`);
        return await this.logService.getUserLogs(data.usuarioId, data.limit);
    }
    async getAlertLogs(alertaId) {
        this.logger.log(`Obteniendo logs para alerta: ${alertaId}`);
        return await this.logService.getAlertLogs(alertaId);
    }
    async getSystemLogs(data) {
        this.logger.log('Obteniendo logs del sistema');
        return await this.logService.getSystemLogs(data.limit);
    }
    async getLogsByType(data) {
        this.logger.log(`Obteniendo logs por tipo: ${data.tipo}`);
        return await this.logService.getLogsByType(data.tipo, data.limit);
    }
};
exports.LogController = LogController;
__decorate([
    (0, microservices_1.MessagePattern)('create_log'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "createLog", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user_logs'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getUserLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_alert_logs'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getAlertLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_system_logs'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getSystemLogs", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_logs_by_type'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getLogsByType", null);
exports.LogController = LogController = LogController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogController);
//# sourceMappingURL=log.controller.js.map