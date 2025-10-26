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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const alerta_service_1 = require("./alerta.service");
let UserController = UserController_1 = class UserController {
    constructor(userService, alertaService) {
        this.userService = userService;
        this.alertaService = alertaService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(userData) {
        this.logger.log('Creating user:', userData);
        return await this.userService.create(userData);
    }
    async getUser(id) {
        this.logger.log(`Getting user with id: ${id}`);
        return await this.userService.findOne(id);
    }
    async getAllUsers() {
        this.logger.log('Getting all users');
        return await this.userService.findAll();
    }
    async updateUser(data) {
        this.logger.log(`Updating user ${data.id}:`, data.userData);
        return await this.userService.update(data.id, data.userData);
    }
    async deleteUser(id) {
        this.logger.log(`Deleting user with id: ${id}`);
        return await this.userService.remove(id);
    }
    async createAlerta(alertaData) {
        this.logger.log('Creating alerta:', alertaData);
        return await this.alertaService.create(alertaData);
    }
    async getAllAlertas() {
        this.logger.log('Getting all alertas');
        return await this.alertaService.findAll();
    }
    async getUserAlertas(userId) {
        this.logger.log(`Getting alertas for user: ${userId}`);
        return await this.alertaService.findByUser(userId);
    }
    async getAlertasActivas() {
        this.logger.log('Getting active alertas');
        return await this.alertaService.findActivas();
    }
    async updateAlertaEstado(data) {
        this.logger.log(`Updating alerta ${data.id} estado to: ${data.estado}`);
        return await this.alertaService.updateEstado(data.id, data.estado);
    }
    async createLog(logData) {
        this.logger.log('Creating log:', logData);
        return await this.alertaService.createLog(logData);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('create_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_all_users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)('update_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('delete_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_alerta'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAlerta", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_all_alertas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllAlertas", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user_alertas'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAlertas", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_alertas_activas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAlertasActivas", null);
__decorate([
    (0, microservices_1.MessagePattern)('update_alerta_estado'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAlertaEstado", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_log'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createLog", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        alerta_service_1.AlertaService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map