import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntry, TipoLog, EstadoLog } from './entities/log-entry.entity';

export interface LogRequest {
  usuarioId: number;
  alertaId?: number;
  tipo: TipoLog;
  mensaje: string;
  metadatos?: any;
  status?: EstadoLog;
}

export interface LogResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(
    @InjectRepository(LogEntry)
    private logRepository: Repository<LogEntry>,
  ) {}

  async createLog(logData: LogRequest): Promise<LogResponse> {
    try {
      const log = this.logRepository.create({
        ...logData,
        deliveredAt: new Date(),
        status: logData.status || EstadoLog.INFO,
      });

      const savedLog = await this.logRepository.save(log);
      
      this.logger.log(`Log creado: ${logData.tipo} para usuario ${logData.usuarioId}`);
      
      return {
        success: true,
        message: 'Log creado exitosamente',
        data: savedLog,
      };
    } catch (error) {
      this.logger.error('Error creando log:', error.stack);
      return {
        success: false,
        message: 'Error al crear el log',
        error: error.message,
      };
    }
  }

  async getUserLogs(usuarioId: number, limit: number = 50): Promise<LogResponse> {
    try {
      const logs = await this.logRepository.find({
        where: { usuarioId },
        order: { createdAt: 'DESC' },
        take: limit,
      });

      return {
        success: true,
        message: `Logs obtenidos para usuario ${usuarioId}`,
        data: logs,
      };
    } catch (error) {
      this.logger.error('Error obteniendo logs de usuario:', error.stack);
      return {
        success: false,
        message: 'Error al obtener logs',
        error: error.message,
      };
    }
  }

  async getAlertLogs(alertaId: number): Promise<LogResponse> {
    try {
      const logs = await this.logRepository.find({
        where: { alertaId },
        order: { createdAt: 'DESC' },
      });

      return {
        success: true,
        message: `Logs obtenidos para alerta ${alertaId}`,
        data: logs,
      };
    } catch (error) {
      this.logger.error('Error obteniendo logs de alerta:', error.stack);
      return {
        success: false,
        message: 'Error al obtener logs de alerta',
        error: error.message,
      };
    }
  }

  async getSystemLogs(limit: number = 100): Promise<LogResponse> {
    try {
      const logs = await this.logRepository.find({
        order: { createdAt: 'DESC' },
        take: limit,
      });

      return {
        success: true,
        message: 'Logs del sistema obtenidos',
        data: logs,
      };
    } catch (error) {
      this.logger.error('Error obteniendo logs del sistema:', error.stack);
      return {
        success: false,
        message: 'Error al obtener logs del sistema',
        error: error.message,
      };
    }
  }

  async getLogsByType(tipo: TipoLog, limit: number = 50): Promise<LogResponse> {
    try {
      const logs = await this.logRepository.find({
        where: { tipo },
        order: { createdAt: 'DESC' },
        take: limit,
      });

      return {
        success: true,
        message: `Logs de tipo ${tipo} obtenidos`,
        data: logs,
      };
    } catch (error) {
      this.logger.error('Error obteniendo logs por tipo:', error.stack);
      return {
        success: false,
        message: 'Error al obtener logs por tipo',
        error: error.message,
      };
    }
  }
}