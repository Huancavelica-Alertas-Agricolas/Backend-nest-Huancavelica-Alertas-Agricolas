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
exports.Alert = exports.EstadoAlerta = exports.TipoAlerta = void 0;
const typeorm_1 = require("typeorm");
var TipoAlerta;
(function (TipoAlerta) {
    TipoAlerta["LLUVIA"] = "lluvia";
    TipoAlerta["TEMPERATURA"] = "temperatura";
    TipoAlerta["HELADA"] = "helada";
    TipoAlerta["SEQUIA"] = "sequia";
    TipoAlerta["VIENTO"] = "viento";
})(TipoAlerta || (exports.TipoAlerta = TipoAlerta = {}));
var EstadoAlerta;
(function (EstadoAlerta) {
    EstadoAlerta["ACTIVA"] = "activa";
    EstadoAlerta["ENVIADA"] = "enviada";
    EstadoAlerta["CANCELADA"] = "cancelada";
    EstadoAlerta["EXPIRADA"] = "expirada";
})(EstadoAlerta || (exports.EstadoAlerta = EstadoAlerta = {}));
let Alert = class Alert {
};
exports.Alert = Alert;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alert.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alert.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Alert.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoAlerta,
        default: TipoAlerta.LLUVIA
    }),
    __metadata("design:type", String)
], Alert.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoAlerta,
        default: EstadoAlerta.ACTIVA
    }),
    __metadata("design:type", String)
], Alert.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Alert.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Alert.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Alert.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Alert.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Alert.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => require('./alert-canal.entity').AlertCanal, (alertCanal) => alertCanal.alert),
    __metadata("design:type", Array)
], Alert.prototype, "channels", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Alert.prototype, "createdAt", void 0);
exports.Alert = Alert = __decorate([
    (0, typeorm_1.Entity)("alerts")
], Alert);
//# sourceMappingURL=alert.entity.js.map