import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SecurityMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, ip, headers } = req;
    const userAgent = headers['user-agent'] || 'Unknown';

    // Security checks
    this.performSecurityChecks(req);

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function (chunk: any, encoding?: any) {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      // Log request completion
      if (statusCode >= 400) {
        this.logger.warn(
          `${method} ${originalUrl} - ${statusCode} - ${responseTime}ms - IP: ${ip} - User-Agent: ${userAgent}`,
        );
      }

      return originalEnd.call(this, chunk, encoding);
    }.bind(this);

    next();
  }

  private performSecurityChecks(req: Request) {
    const { headers, method, originalUrl } = req;

    // Check for suspicious headers
    const suspiciousHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-original-url',
      'x-rewrite-url',
    ];

    suspiciousHeaders.forEach((header) => {
      if (headers[header]) {
        this.logger.debug(`Suspicious header detected: ${header}: ${headers[header]}`);
      }
    });

    // Check for SQL injection patterns in URL
    const sqlInjectionPatterns = [
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
      /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    ];

    if (sqlInjectionPatterns.some((pattern) => pattern.test(originalUrl))) {
      this.logger.warn(`Potential SQL injection attempt detected: ${method} ${originalUrl}`);
    }

    // Check for XSS patterns
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
    ];

    if (xssPatterns.some((pattern) => pattern.test(originalUrl))) {
      this.logger.warn(`Potential XSS attempt detected: ${method} ${originalUrl}`);
    }
  }
}