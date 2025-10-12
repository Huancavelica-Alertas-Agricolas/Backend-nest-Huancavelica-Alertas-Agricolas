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
exports.AlertCanal = exports.EstadoEnvio = exports.TipoCanal = void 0;
const typeorm_1 = require("typeorm");
var TipoCanal;
(function (TipoCanal) {
    TipoCanal["EMAIL"] = "email";
    TipoCanal["SMS"] = "sms";
    TipoCanal["PUSH"] = "push";
    TipoCanal["WEBHOOK"] = "webhook";
})(TipoCanal || (exports.TipoCanal = TipoCanal = {}));
var EstadoEnvio;
(function (EstadoEnvio) {
    EstadoEnvio["PENDIENTE"] = "pendiente";
    EstadoEnvio["ENVIADO"] = "enviado";
    EstadoEnvio["FALLIDO"] = "fallido";
    EstadoEnvio["ENTREGADO"] = "entregado";
})(EstadoEnvio || (exports.EstadoEnvio = EstadoEnvio = {}));
let AlertCanal = class AlertCanal {
};
exports.AlertCanal = AlertCanal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlertCanal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AlertCanal.prototype, "alertId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoCanal
    }),
    __metadata("design:type", String)
], AlertCanal.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlertCanal.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoEnvio,
        default: EstadoEnvio.PENDIENTE
    }),
    __metadata("design:type", String)
], AlertCanal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AlertCanal.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AlertCanal.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AlertCanal.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => require('./alert.entity').Alert, (alert) => alert.channels),
    (0, typeorm_1.JoinColumn)({ name: 'alertId' }),
    __metadata("design:type", Function)
], AlertCanal.prototype, "alert", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AlertCanal.prototype, "createdAt", void 0);
exports.AlertCanal = AlertCanal = __decorate([
    (0, typeorm_1.Entity)("alert_channels")
], AlertCanal);
//# sourceMappingURL=alert-canal.entity.js.map