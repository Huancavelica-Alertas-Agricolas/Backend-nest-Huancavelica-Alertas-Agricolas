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
exports.PreferenciasNotificacion = exports.TipoAlerta = exports.TipoCanal = void 0;
const typeorm_1 = require("typeorm");
var TipoCanal;
(function (TipoCanal) {
    TipoCanal["EMAIL"] = "email";
    TipoCanal["SMS"] = "sms";
    TipoCanal["PUSH"] = "push";
    TipoCanal["WHATSAPP"] = "whatsapp";
})(TipoCanal || (exports.TipoCanal = TipoCanal = {}));
var TipoAlerta;
(function (TipoAlerta) {
    TipoAlerta["LLUVIA"] = "lluvia";
    TipoAlerta["TEMPERATURA"] = "temperatura";
    TipoAlerta["HELADA"] = "helada";
    TipoAlerta["SEQUIA"] = "sequia";
    TipoAlerta["VIENTO"] = "viento";
    TipoAlerta["TODAS"] = "todas";
})(TipoAlerta || (exports.TipoAlerta = TipoAlerta = {}));
let PreferenciasNotificacion = class PreferenciasNotificacion {
};
exports.PreferenciasNotificacion = PreferenciasNotificacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PreferenciasNotificacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PreferenciasNotificacion.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoCanal
    }),
    __metadata("design:type", String)
], PreferenciasNotificacion.prototype, "canal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoAlerta,
        default: TipoAlerta.TODAS
    }),
    __metadata("design:type", String)
], PreferenciasNotificacion.prototype, "tipoAlerta", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PreferenciasNotificacion.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PreferenciasNotificacion.prototype, "destinatario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], PreferenciasNotificacion.prototype, "configuracion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], PreferenciasNotificacion.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], PreferenciasNotificacion.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], PreferenciasNotificacion.prototype, "diasSemana", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PreferenciasNotificacion.prototype, "alertasInmediatas", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PreferenciasNotificacion.prototype, "resumenDiario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PreferenciasNotificacion.prototype, "reporteSemanal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PreferenciasNotificacion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PreferenciasNotificacion.prototype, "updatedAt", void 0);
exports.PreferenciasNotificacion = PreferenciasNotificacion = __decorate([
    (0, typeorm_1.Entity)("preferencias_notificacion")
], PreferenciasNotificacion);
//# sourceMappingURL=preferencias-notificacion.entity.js.map