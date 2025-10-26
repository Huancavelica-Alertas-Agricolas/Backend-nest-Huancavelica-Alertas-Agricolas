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
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const alert_controller_1 = require("./alert.controller");
const alert_service_1 = require("./alert.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            microservices_1.ClientsModule.register([
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
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.USER_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.USER_SERVICE_PORT) || 3001,
                    },
                },
            ]),
            nestjs_prometheus_1.PrometheusModule.register(),
        ],
        controllers: [alert_controller_1.AlertController],
        providers: [alert_service_1.AlertService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map