"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const crypto = require("crypto");
if (!global.crypto) {
    global.crypto = {
        randomUUID: crypto.randomUUID
    };
}
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const log_controller_1 = require("./log.controller");
const log_service_1 = require("./log.service");
const log_entry_entity_1 = require("./entities/log-entry.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5433),
                    username: configService.get('DB_USER', 'admin'),
                    password: configService.get('DB_PASSWORD', 'admin'),
                    database: configService.get('DB_NAME', 'agro_alertas'),
                    entities: [log_entry_entity_1.LogEntry],
                    synchronize: configService.get('TYPEORM_SYNCHRONIZE', 'true') === 'true' || configService.get('NODE_ENV') !== 'production',
                    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([log_entry_entity_1.LogEntry]),
        ],
        controllers: [log_controller_1.LogController],
        providers: [log_service_1.LogService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map