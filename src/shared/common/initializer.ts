import { INestApplication } from '@nestjs/common';
import { createNamespace } from 'cls-hooked';

import { LOGGER_GLOBAL } from '@/shared/modules/logger/constants';
import { LoggerService } from '@/shared/modules/logger/logger.service';

export class Initializer {
  public constructor(private readonly app: INestApplication) {}

  private async initLogger() {
    this.app.useLogger(await this.app.resolve(LoggerService));

    createNamespace(LOGGER_GLOBAL);
  }

  public run() {
    this.initLogger();
  }
}
