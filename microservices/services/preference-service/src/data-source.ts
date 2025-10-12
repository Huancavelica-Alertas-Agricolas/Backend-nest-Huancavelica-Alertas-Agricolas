import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { PreferenciasNotificacion } from './entities/preferencias-notificacion.entity';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'preferences_db',
  entities: [PreferenciasNotificacion],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
