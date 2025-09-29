import { Injectable, LoggerService } from '@nestjs/common';

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

@Injectable()
export class CustomLogger implements LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: LogContext) {
    this.printMessage('LOG', message, context);
  }

  error(message: string, trace?: string, context?: LogContext) {
    this.printMessage('ERROR', message, { ...context, trace });
  }

  warn(message: string, context?: LogContext) {
    this.printMessage('WARN', message, context);
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      this.printMessage('DEBUG', message, context);
    }
  }

  verbose(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      this.printMessage('VERBOSE', message, context);
    }
  }

  private printMessage(level: string, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      context: this.context,
      ...context,
    };

    // In production, you might want to send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logEntry));
    } else {
      // Pretty print for development
      console.log(`[${timestamp}] [${level}] ${this.context ? `[${this.context}] ` : ''}${message}`);
      if (context && Object.keys(context).length > 0) {
        console.log('Context:', JSON.stringify(context, null, 2));
      }
    }
  }
}