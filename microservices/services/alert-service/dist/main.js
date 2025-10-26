"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: {
            log: (msg) => logger.info(msg),
            error: (msg, trace) => logger.error(msg, { trace }),
            warn: (msg) => logger.warn(msg),
            debug: (msg) => logger.debug(msg),
            verbose: (msg) => logger.verbose(msg),
        },
    });
    await app.listen(process.env.PORT || 3001);
    logger.info('🚨 Alert Service is listening on port 3004');
}
bootstrap();
bootstrap();
//# sourceMappingURL=main.js.map