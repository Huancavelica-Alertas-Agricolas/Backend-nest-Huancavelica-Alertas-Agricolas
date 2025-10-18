"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const preference_controller_1 = require("./preference.controller");
const preference_service_1 = require("./preference.service");
const preferencias_notificacion_entity_1 = require("./entities/preferencias-notificacion.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'postgres',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER || 'admin',
                password: process.env.DB_PASSWORD || 'admin',
                database: process.env.DB_NAME || 'agro_alertas',
                entities: [preferencias_notificacion_entity_1.PreferenciasNotificacion],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([preferencias_notificacion_entity_1.PreferenciasNotificacion]),
        ],
        controllers: [preference_controller_1.PreferenceController],
        providers: [preference_service_1.PreferenceService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map