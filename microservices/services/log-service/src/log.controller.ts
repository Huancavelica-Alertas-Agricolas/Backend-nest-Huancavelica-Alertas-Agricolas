import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService, LogRequest, LogResponse } from './log.service';

@Controller()
export class LogController {
  private readonly logger = new Logger(LogController.name);

  constructor(private readonly logService: LogService) {}

  @MessagePattern('create_log')
  async createLog(@Payload() logData: LogRequest): Promise<LogResponse> {
    this.logger.log('Creando log:', logData);
    return await this.logService.createLog(logData);
  }

  @MessagePattern('get_user_logs')
  async getUserLogs(@Payload() data: { usuarioId: number; limit?: number }): Promise<LogResponse> {
    this.logger.log(`Obteniendo logs para usuario: ${data.usuarioId}`);
    return await this.logService.getUserLogs(data.usuarioId, data.limit);
  }

  @MessagePattern('get_alert_logs')
  async getAlertLogs(@Payload() alertaId: number): Promise<LogResponse> {
    this.logger.log(`Obteniendo logs para alerta: ${alertaId}`);
    return await this.logService.getAlertLogs(alertaId);
  }

  @MessagePattern('get_system_logs')
  async getSystemLogs(@Payload() data: { limit?: number }): Promise<LogResponse> {
    this.logger.log('Obteniendo logs del sistema');
    return await this.logService.getSystemLogs(data.limit);
  }

  @MessagePattern('get_logs_by_type')
  async getLogsByType(@Payload() data: { tipo: string; limit?: number }): Promise<LogResponse> {
    this.logger.log(`Obteniendo logs por tipo: ${data.tipo}`);
    return await this.logService.getLogsByType(data.tipo as any, data.limit);
  }
}