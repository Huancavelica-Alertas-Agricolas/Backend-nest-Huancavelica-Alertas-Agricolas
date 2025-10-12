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
export declare class LogService {
    private logRepository;
    private readonly logger;
    constructor(logRepository: Repository<LogEntry>);
    createLog(logData: LogRequest): Promise<LogResponse>;
    getUserLogs(usuarioId: number, limit?: number): Promise<LogResponse>;
    getAlertLogs(alertaId: number): Promise<LogResponse>;
    getSystemLogs(limit?: number): Promise<LogResponse>;
    getLogsByType(tipo: TipoLog, limit?: number): Promise<LogResponse>;
}
