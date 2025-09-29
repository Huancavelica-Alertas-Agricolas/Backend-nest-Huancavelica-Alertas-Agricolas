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
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LogEntry } from './entities/log-entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5433),
        username: configService.get('DB_USER', 'admin'),
        password: configService.get('DB_PASSWORD', 'admin'),
        database: configService.get('DB_NAME', 'agro_alertas'),
        entities: [LogEntry],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE', 'true') === 'true' || configService.get('NODE_ENV') !== 'production',
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([LogEntry]),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class AppModule {}