import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { getNamespace } from 'cls-hooked';

import { LogLevelsEnum } from '@/shared/modules/logger/log-levels.enum';
import {
  LOGGER_CORRELATION_ID,
  LOGGER_GLOBAL,
} from '@/shared/modules/logger/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winston: WinstonLogger,
  ) {
    super();
  }

  private getLogger(): WinstonLogger {
    const session = getNamespace(LOGGER_GLOBAL);
    const correlationId = session?.get(LOGGER_CORRELATION_ID);

    return correlationId ? this.winston.child({ correlationId }) : this.winston;
  }

  private print(
    level: LogLevelsEnum,
    message: any,
    context?: string,
    stack?: string,
  ) {
    this.getLogger().log(level, {
      message,
      stack,
      context: context || this.context,
    });
  }

  error(message: any, stack?: string, context?: string): void {
    this.print(LogLevelsEnum.ERROR, message, context, stack);
  }

  log(message: any, context?: string): void {
    this.print(LogLevelsEnum.INFO, message, context);
  }

  warn(message: any, context?: string): void {
    this.print(LogLevelsEnum.WARN, message, context);
  }

  debug(message: any, context?: string): void {
    this.print(LogLevelsEnum.DEBUG, message, context);
  }

  verbose(message: any, context?: string): void {
    this.print(LogLevelsEnum.VERBOSE, message, context);
  }
}
