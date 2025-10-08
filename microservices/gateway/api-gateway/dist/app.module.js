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
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const gateway_controller_1 = require("./gateway.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.USER_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.USER_SERVICE_PORT) || 3001
                    },
                },
                {
                    name: 'WEATHER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.WEATHER_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.WEATHER_SERVICE_PORT) || 3002
                    },
                },
                {
                    name: 'NOTIFICATION_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.NOTIFICATION_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.NOTIFICATION_SERVICE_PORT) || 3003
                    },
                },
                {
                    name: 'ALERT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.ALERT_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.ALERT_SERVICE_PORT) || 3004
                    },
                },
                {
                    name: 'LOG_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.LOG_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.LOG_SERVICE_PORT) || 3005
                    },
                },
                {
                    name: 'PREFERENCE_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.PREFERENCE_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.PREFERENCE_SERVICE_PORT) || 3006
                    },
                },
            ]),
        ],
        controllers: [gateway_controller_1.GatewayController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map