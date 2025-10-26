import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SecurityLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SecurityLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, headers, ip } = request;
    const userAgent = headers['user-agent'] || 'Unknown';
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const responseTime = Date.now() - now;

        // Log suspicious activity
        if (statusCode === 429) {
          this.logger.warn(
            `Rate limit exceeded - IP: ${ip}, Method: ${method}, URL: ${url}, User-Agent: ${userAgent}`,
          );
        }

        if (statusCode >= 400) {
          this.logger.warn(
            `HTTP ${statusCode} - IP: ${ip}, Method: ${method}, URL: ${url}, User-Agent: ${userAgent}, Response Time: ${responseTime}ms`,
          );
        }

        // Log successful requests at debug level
        if (statusCode < 400) {
          this.logger.debug(
            `HTTP ${statusCode} - IP: ${ip}, Method: ${method}, URL: ${url}, Response Time: ${responseTime}ms`,
          );
        }
      }),
    );
  }
}