import { LoggerService } from '@nestjs/common';
export interface LogContext {
    userId?: string;
    requestId?: string;
    service?: string;
    method?: string;
    url?: string;
    statusCode?: number;
    duration?: number;
    error?: string;
    [key: string]: any;
}
export declare class CustomLogger implements LoggerService {
    private context?;
    constructor(context?: string);
    setContext(context: string): void;
    log(message: string, context?: LogContext): void;
    error(message: string, trace?: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    debug(message: string, context?: LogContext): void;
    verbose(message: string, context?: LogContext): void;
    private printMessage;
}
