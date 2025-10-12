// EstacionService has been removed from user-service. The estaciones domain now belongs to the alert/weather services.
// Keep a runtime placeholder that returns clear error if used accidentally.
import { Injectable } from '@nestjs/common';

@Injectable()
export class EstacionService {
  constructor() {
    // Intentionally empty; this service is deprecated in user-service.
  }

  throwRemoved() {
    throw new Error(
      'EstacionService has been removed from user-service. Use alert-service/weather-service instead.',
    );
  }
}
