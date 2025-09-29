import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { PreferenciasNotificacion } from './entities/preferencias-notificacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'agro_alertas',
      entities: [PreferenciasNotificacion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PreferenciasNotificacion]),
  ],
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class AppModule {}