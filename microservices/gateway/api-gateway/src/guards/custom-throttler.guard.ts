import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: any): Promise<string> {
    // Use IP address as tracker
    return req.ip || req.socket.remoteAddress || 'unknown';
  }

  protected async shouldSkip(context: any): Promise<boolean> {
    // Skip throttling for health checks
    const request = context.switchToHttp().getRequest();
    const path = request.url;
    
    // Skip rate limiting for health endpoint
    if (path === '/api/health' || path === '/health') {
      return true;
    }
    
    return false;
  }

  protected getThrottlerSuffix(context: any): string {
    const request = context.switchToHttp().getRequest();
    const path = request.url;
    
    // Apply different rate limits based on endpoint
    if (path.includes('/auth/')) {
      return 'auth';
    } else if (path.includes('/data/') || path.includes('/weather/')) {
      return 'data';
    }
    
    return 'global';
  }
}