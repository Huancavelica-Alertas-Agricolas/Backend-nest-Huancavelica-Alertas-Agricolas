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
var LogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const log_entry_entity_1 = require("./entities/log-entry.entity");
let LogService = LogService_1 = class LogService {
    constructor(logRepository) {
        this.logRepository = logRepository;
        this.logger = new common_1.Logger(LogService_1.name);
    }
    async createLog(logData) {
        try {
            const log = this.logRepository.create({
                ...logData,
                deliveredAt: new Date(),
                status: logData.status || log_entry_entity_1.EstadoLog.INFO,
            });
            const savedLog = await this.logRepository.save(log);
            this.logger.log(`Log creado: ${logData.tipo} para usuario ${logData.usuarioId}`);
            return {
                success: true,
                message: 'Log creado exitosamente',
                data: savedLog,
            };
        }
        catch (error) {
            this.logger.error('Error creando log:', error.stack);
            return {
                success: false,
                message: 'Error al crear el log',
                error: error.message,
            };
        }
    }
    async getUserLogs(usuarioId, limit = 50) {
        try {
            const logs = await this.logRepository.find({
                where: { usuarioId },
                order: { createdAt: 'DESC' },
                take: limit,
            });
            return {
                success: true,
                message: `Logs obtenidos para usuario ${usuarioId}`,
                data: logs,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo logs de usuario:', error.stack);
            return {
                success: false,
                message: 'Error al obtener logs',
                error: error.message,
            };
        }
    }
    async getAlertLogs(alertaId) {
        try {
            const logs = await this.logRepository.find({
                where: { alertaId },
                order: { createdAt: 'DESC' },
            });
            return {
                success: true,
                message: `Logs obtenidos para alerta ${alertaId}`,
                data: logs,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo logs de alerta:', error.stack);
            return {
                success: false,
                message: 'Error al obtener logs de alerta',
                error: error.message,
            };
        }
    }
    async getSystemLogs(limit = 100) {
        try {
            const logs = await this.logRepository.find({
                order: { createdAt: 'DESC' },
                take: limit,
            });
            return {
                success: true,
                message: 'Logs del sistema obtenidos',
                data: logs,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo logs del sistema:', error.stack);
            return {
                success: false,
                message: 'Error al obtener logs del sistema',
                error: error.message,
            };
        }
    }
    async getLogsByType(tipo, limit = 50) {
        try {
            const logs = await this.logRepository.find({
                where: { tipo },
                order: { createdAt: 'DESC' },
                take: limit,
            });
            return {
                success: true,
                message: `Logs de tipo ${tipo} obtenidos`,
                data: logs,
            };
        }
        catch (error) {
            this.logger.error('Error obteniendo logs por tipo:', error.stack);
            return {
                success: false,
                message: 'Error al obtener logs por tipo',
                error: error.message,
            };
        }
    }
};
exports.LogService = LogService;
exports.LogService = LogService = LogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_entry_entity_1.LogEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LogService);
//# sourceMappingURL=log.service.js.map