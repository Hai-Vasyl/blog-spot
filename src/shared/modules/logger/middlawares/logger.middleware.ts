import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getNamespace } from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid';

import {
  LOGGER_CORRELATION_ID,
  LOGGER_GLOBAL,
} from '@/shared/modules/logger/constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, _res: Response, next: NextFunction): void {
    const correlationId = req.headers['correlation-id'] || uuidv4();

    const session = getNamespace(LOGGER_GLOBAL);

    session.run(() => {
      session.set(LOGGER_CORRELATION_ID, correlationId);
      next();
    });
  }
}
