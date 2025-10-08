"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Agro-Alertas API')
        .setDescription('Sistema de Microservicios para Monitoreo Climático Agrícola')
        .setVersion('2.0.0')
        .addTag('users', 'Gestión de usuarios')
        .addTag('weather', 'Datos meteorológicos')
        .addTag('alerts', 'Sistema de alertas')
        .addTag('notifications', 'Servicio de notificaciones')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 API Gateway running on port ${port}`);
    common_1.Logger.log(`📚 Swagger documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map