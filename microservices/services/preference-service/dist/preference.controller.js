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
var PreferenceController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const preference_service_1 = require("./preference.service");
let PreferenceController = PreferenceController_1 = class PreferenceController {
    constructor(preferenceService) {
        this.preferenceService = preferenceService;
        this.logger = new common_1.Logger(PreferenceController_1.name);
    }
    async createPreference(preferenceData) {
        this.logger.log('Creando preferencia:', preferenceData);
        return await this.preferenceService.createPreference(preferenceData);
    }
    async getUserPreferences(usuarioId) {
        this.logger.log(`Obteniendo preferencias para usuario: ${usuarioId}`);
        return await this.preferenceService.getUserPreferences(usuarioId);
    }
    async updatePreference(data) {
        this.logger.log(`Actualizando preferencia: ${data.id}`);
        const { id, ...preferenceData } = data;
        return await this.preferenceService.updatePreference(id, preferenceData);
    }
    async deletePreference(id) {
        this.logger.log(`Eliminando preferencia: ${id}`);
        return await this.preferenceService.deletePreference(id);
    }
    async getActivePreferences(data) {
        this.logger.log(`Obteniendo preferencias activas para usuario: ${data.usuarioId} y tipo: ${data.tipoAlerta}`);
        return await this.preferenceService.getActivePreferences(data.usuarioId, data.tipoAlerta);
    }
};
exports.PreferenceController = PreferenceController;
__decorate([
    (0, microservices_1.MessagePattern)('create_preference'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "createPreference", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user_preferences'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "getUserPreferences", null);
__decorate([
    (0, microservices_1.MessagePattern)('update_preference'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "updatePreference", null);
__decorate([
    (0, microservices_1.MessagePattern)('delete_preference'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "deletePreference", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_active_preferences'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "getActivePreferences", null);
exports.PreferenceController = PreferenceController = PreferenceController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [preference_service_1.PreferenceService])
], PreferenceController);
//# sourceMappingURL=preference.controller.js.map