"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const user_entity_1 = require("./entities/user.entity");
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5434', 10),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'users_db',
    entities: [user_entity_1.User],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    migrationsTableName: 'migrations',
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map