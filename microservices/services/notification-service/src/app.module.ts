import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    PrometheusModule.register(),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}