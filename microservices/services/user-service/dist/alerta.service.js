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
var AlertaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AlertaService = AlertaService_1 = class AlertaService {
    constructor() {
        this.logger = new common_1.Logger(AlertaService_1.name);
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: process.env.ALERT_SERVICE_HOST || 'localhost',
                port: Number(process.env.ALERT_SERVICE_PORT) || 3004,
            },
        });
    }
    async create(alertaData) {
        this.logger.log('Forwarding create alerta to alert-service');
        return await (0, rxjs_1.firstValueFrom)(this.client.send('create_alerta', alertaData));
    }
    async findAll() {
        this.logger.log('Requesting all alertas from alert-service');
        return await (0, rxjs_1.firstValueFrom)(this.client.send('get_all_alertas', {}));
    }
    async findByUser(usuarioId) {
        this.logger.log(`Requesting alertas for user ${usuarioId} from alert-service`);
        return await (0, rxjs_1.firstValueFrom)(this.client.send('get_user_alertas', usuarioId));
    }
    async findActivas() {
        this.logger.log('Requesting active alertas from alert-service');
        return await (0, rxjs_1.firstValueFrom)(this.client.send('get_alertas_activas', {}));
    }
    async updateEstado(id, estado) {
        this.logger.log(`Forwarding update estado for alerta ${id} to alert-service`);
        return await (0, rxjs_1.firstValueFrom)(this.client.send('update_alerta_estado', { id, estado }));
    }
    async createLog(logData) {
        this.logger.log('Forwarding create log to alert-service');
        return await (0, rxjs_1.firstValueFrom)(this.client.send('create_log', logData));
    }
    async addCanal(alertaId, canalData) {
        this.logger.log(`Forwarding add canal for alerta ${alertaId} to alert-service`);
        return await (0, rxjs_1.firstValueFrom)(this.client.send('add_canal', { alertaId, canalData }));
    }
};
AlertaService = AlertaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AlertaService);
exports.AlertaService = AlertaService;
//# sourceMappingURL=alerta.service.js.map