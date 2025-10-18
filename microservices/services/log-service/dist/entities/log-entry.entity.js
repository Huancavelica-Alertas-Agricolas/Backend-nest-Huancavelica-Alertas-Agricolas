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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = exports.EstadoLog = exports.TipoLog = void 0;
const typeorm_1 = require("typeorm");
var TipoLog;
(function (TipoLog) {
    TipoLog["ALERTA_CREADA"] = "alerta_creada";
    TipoLog["ALERTA_ENVIADA"] = "alerta_enviada";
    TipoLog["ALERTA_CANCELADA"] = "alerta_cancelada";
    TipoLog["ERROR_ENVIO"] = "error_envio";
    TipoLog["LECTURA_RECIBIDA"] = "lectura_recibida";
    TipoLog["NOTIFICACION_ENVIADA"] = "notificacion_enviada";
    TipoLog["SISTEMA"] = "sistema";
    TipoLog["LOGIN"] = "login";
    TipoLog["LOGOUT"] = "logout";
})(TipoLog || (exports.TipoLog = TipoLog = {}));
var EstadoLog;
(function (EstadoLog) {
    EstadoLog["SUCCESS"] = "success";
    EstadoLog["ERROR"] = "error";
    EstadoLog["WARNING"] = "warning";
    EstadoLog["INFO"] = "info";
})(EstadoLog || (exports.EstadoLog = EstadoLog = {}));
let LogEntry = class LogEntry {
};
exports.LogEntry = LogEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LogEntry.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LogEntry.prototype, "alertaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoLog
    }),
    __metadata("design:type", String)
], LogEntry.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoLog,
        default: EstadoLog.INFO
    }),
    __metadata("design:type", String)
], LogEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], LogEntry.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], LogEntry.prototype, "metadatos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LogEntry.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LogEntry.prototype, "createdAt", void 0);
exports.LogEntry = LogEntry = __decorate([
    (0, typeorm_1.Entity)("logs")
], LogEntry);
//# sourceMappingURL=log-entry.entity.js.map