"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const alert_entity_1 = require("./entities/alert.entity");
const alert_canal_entity_1 = require("./entities/alert-canal.entity");
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'alerts_db',
    entities: [alert_entity_1.Alert, alert_canal_entity_1.AlertCanal],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    migrationsTableName: 'migrations',
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map