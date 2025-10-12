import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AlertaService {
  private readonly logger = new Logger(AlertaService.name);
  private readonly client: ClientProxy;

  constructor() {
    // create a TCP client that will talk to the alert-service microservice
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.ALERT_SERVICE_HOST || 'localhost',
        port: Number(process.env.ALERT_SERVICE_PORT) || 3004,
      },
    });
  }

  async create(alertaData: any): Promise<any> {
    this.logger.log('Forwarding create alerta to alert-service');
    return await firstValueFrom(this.client.send('create_alerta', alertaData));
  }

  async findAll(): Promise<any> {
    this.logger.log('Requesting all alertas from alert-service');
    return await firstValueFrom(this.client.send('get_all_alertas', {}));
  }

  async findByUser(usuarioId: number): Promise<any> {
    this.logger.log(
      `Requesting alertas for user ${usuarioId} from alert-service`,
    );
    return await firstValueFrom(
      this.client.send('get_user_alertas', usuarioId),
    );
  }

  async findActivas(): Promise<any> {
    this.logger.log('Requesting active alertas from alert-service');
    return await firstValueFrom(this.client.send('get_alertas_activas', {}));
  }

  async updateEstado(id: number, estado: any): Promise<any> {
    this.logger.log(
      `Forwarding update estado for alerta ${id} to alert-service`,
    );
    return await firstValueFrom(
      this.client.send('update_alerta_estado', { id, estado }),
    );
  }

  async createLog(logData: any): Promise<any> {
    this.logger.log('Forwarding create log to alert-service');
    return await firstValueFrom(this.client.send('create_log', logData));
  }

  async addCanal(alertaId: number, canalData: any): Promise<any> {
    this.logger.log(
      `Forwarding add canal for alerta ${alertaId} to alert-service`,
    );
    return await firstValueFrom(
      this.client.send('add_canal', { alertaId, canalData }),
    );
  }
}
