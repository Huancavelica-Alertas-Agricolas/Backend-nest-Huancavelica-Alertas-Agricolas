import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import logger from './logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly log = logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctxType = host.getType();
    let message = '';
    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof RpcException) {
      message = (exception as any).message;
    } else if (exception instanceof Error) {
      message = exception.message;
    } else {
      message = String(exception);
    }
    this.log.error('Exception capturada', { type: ctxType, message, stack: (exception as any)?.stack });
  }
}