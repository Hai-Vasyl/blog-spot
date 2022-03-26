import { registerAs } from '@nestjs/config';
import * as winston from 'winston';

import { dateToLocalString } from '@/shared/helpers/date-to-local-string';

export default registerAs('winston', () => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((log) => {
          const { message } = log;
          let { context, level, correlationId, stack, timestamp } = log;

          level = `[${level}] ${process.pid}`;
          timestamp = dateToLocalString(timestamp);
          context = context ? `[${context}]` : '[NestApplication]';
          stack = stack ? `\n\x1b[31m\n[${stack}]\x1b[37m` : '';
          correlationId = correlationId ? `(${correlationId})  ` : '';
          const baseLog = `${level}   ${correlationId}- ${timestamp}   ${context}`;

          if (correlationId) {
            return `${baseLog}
${message}${stack}`;
          }

          return `${baseLog} ${message}${stack}`;
        }),
      ),
    }),
  ],
}));
