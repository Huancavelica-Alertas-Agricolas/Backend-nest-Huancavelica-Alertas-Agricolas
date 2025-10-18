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
var PreferenceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const preferencias_notificacion_entity_1 = require("./entities/preferencias-notificacion.entity");
let PreferenceService = PreferenceService_1 = class PreferenceService {
    constructor(preferenceRepository) {
        this.preferenceRepository = preferenceRepository;
        this.logger = new common_1.Logger(PreferenceService_1.name);
    }
    async createPreference(preferenceData) {
        try {
            const preference = this.preferenceRepository.create({
                ...preferenceData,
                tipoAlerta: preferenceData.tipoAlerta || preferencias_notificacion_entity_1.TipoAlerta.TODAS,
                activo: preferenceData.activo !== undefined ? preferenceData.activo : true,
                alertasInmediatas: preferenceData.alertasInmediatas !== undefined ? preferenceData.alertasInmediatas : true,
                resumenDiario: preferenceData.resumenDiario || false,
                reporteSemanal: preferenceData.reporteSemanal || false,
            });
            const savedPreference = await this.preferenceRepository.save(preference);
            this.logger.log(`Preferencia creada para usuario: ${preferenceData.usuarioId}`);
            return {
                success: true,
                message: 'Preferencia creada exitosamente',
                data: savedPreference,
            };
        }
        catch (error) {
            this.logger.error('Error creando preferencia:', error.stack);
            return {
                success: false,
                message: 'Error al crear la preferencia',
                error: error.message,
            };
        }
    }
    async getUserPreferences(usuarioId) {
        try {
            const preferences = await this.preferenceRepository.find({
                where: { usuarioId },
                order: { createdAt: 'DESC' },
            });
            return {
                success: true,
                message: `Preferencias obtenidas para usuario ${usuarioId}`,
                data: preferences,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo preferencias de usuario:', error.stack);
            return {
                success: false,
                message: 'Error al obtener preferencias',
                error: error.message,
            };
        }
    }
    async updatePreference(id, preferenceData) {
        try {
            const existingPreference = await this.preferenceRepository.findOne({ where: { id } });
            if (!existingPreference) {
                return {
                    success: false,
                    message: 'Preferencia no encontrada',
                };
            }
            await this.preferenceRepository.update(id, preferenceData);
            const updatedPreference = await this.preferenceRepository.findOne({ where: { id } });
            this.logger.log(`Preferencia actualizada: ${id}`);
            return {
                success: true,
                message: 'Preferencia actualizada exitosamente',
                data: updatedPreference,
            };
        }
        catch (error) {
            this.logger.error('Error actualizando preferencia:', error.stack);
            return {
                success: false,
                message: 'Error al actualizar la preferencia',
                error: error.message,
            };
        }
    }
    async deletePreference(id) {
        try {
            const result = await this.preferenceRepository.delete(id);
            if (result.affected === 0) {
                return {
                    success: false,
                    message: 'Preferencia no encontrada',
                };
            }
            this.logger.log(`Preferencia eliminada: ${id}`);
            return {
                success: true,
                message: 'Preferencia eliminada exitosamente',
            };
        }
        catch (error) {
            this.logger.error('Error eliminando preferencia:', error.stack);
            return {
                success: false,
                message: 'Error al eliminar la preferencia',
                error: error.message,
            };
        }
    }
    async getActivePreferences(usuarioId, tipoAlerta) {
        try {
            const preferences = await this.preferenceRepository.find({
                where: [
                    { usuarioId, activo: true, tipoAlerta },
                    { usuarioId, activo: true, tipoAlerta: preferencias_notificacion_entity_1.TipoAlerta.TODAS }
                ],
            });
            return {
                success: true,
                message: `Preferencias activas obtenidas para usuario ${usuarioId} y tipo ${tipoAlerta}`,
                data: preferences,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo preferencias activas:', error.stack);
            return {
                success: false,
                message: 'Error al obtener preferencias activas',
                error: error.message,
            };
        }
    }
};
exports.PreferenceService = PreferenceService;
exports.PreferenceService = PreferenceService = PreferenceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(preferencias_notificacion_entity_1.PreferenciasNotificacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PreferenceService);
//# sourceMappingURL=preference.service.js.map