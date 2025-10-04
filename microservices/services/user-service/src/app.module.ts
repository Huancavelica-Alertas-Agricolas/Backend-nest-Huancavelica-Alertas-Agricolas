import * as crypto from 'crypto';

// Polyfill crypto for Node.js compatibility
if (!global.crypto) {
  (global as any).crypto = {
    randomUUID: crypto.randomUUID
  };
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EstacionService } from './estacion.service';
import { AlertaService } from './alerta.service';
import { User } from './entities/user.entity';
import { Estacion } from './entities/estacion.entity';
import { Lectura } from './entities/lectura.entity';
import { Alerta } from './entities/alerta.entity';
import { AlertCanal } from './entities/alert-canal.entity';
import { Log } from './entities/log.entity';
import { PreferenciasNotificacion } from './entities/preferencias-notificacion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5434),
        username: configService.get('DB_USER', 'admin'),
        password: configService.get('DB_PASSWORD', 'admin'),
        database: configService.get('DB_NAME', 'agro_alertas'),
        entities: [User, Estacion, Lectura, Alerta, AlertCanal, Log, PreferenciasNotificacion],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE', 'true') === 'true' || configService.get('NODE_ENV') !== 'production',
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Estacion, Lectura, Alerta, AlertCanal, Log, PreferenciasNotificacion]),
  ],
  controllers: [UserController],
  providers: [UserService, EstacionService, AlertaService],
})
export class AppModule {}