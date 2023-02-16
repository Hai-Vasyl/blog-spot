import { INestApplication, ValidationPipe } from '@nestjs/common';
import { createNamespace } from 'cls-hooked';

import { LOGGER_GLOBAL } from '@/shared/modules/logger/constants';
import { LoggerService } from '@/shared/modules/logger/logger.service';

export class Initializer {
  public constructor(private readonly app: INestApplication) {}

  private async initLogger(): Promise<void> {
    this.app.useLogger(await this.app.resolve(LoggerService));

    createNamespace(LOGGER_GLOBAL);
  }

  private initValidation(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
  }

  public async run() {
    await this.initLogger();
    this.initValidation();
  }
}
