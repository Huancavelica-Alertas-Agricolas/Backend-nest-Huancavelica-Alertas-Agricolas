import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'alert-service' },
  transports: [
    new transports.Console(),
    // Puedes agregar un transport a archivo si lo deseas
    // new transports.File({ filename: 'logs/alert-service.log' })
  ],
});

export default logger;