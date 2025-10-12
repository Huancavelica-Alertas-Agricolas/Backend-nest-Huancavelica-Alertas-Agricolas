import { LogService, LogRequest, LogResponse } from './log.service';
export declare class LogController {
    private readonly logService;
    private readonly logger;
    constructor(logService: LogService);
    createLog(logData: LogRequest): Promise<LogResponse>;
    getUserLogs(data: {
        usuarioId: number;
        limit?: number;
    }): Promise<LogResponse>;
    getAlertLogs(alertaId: number): Promise<LogResponse>;
    getSystemLogs(data: {
        limit?: number;
    }): Promise<LogResponse>;
    getLogsByType(data: {
        tipo: string;
        limit?: number;
    }): Promise<LogResponse>;
}
