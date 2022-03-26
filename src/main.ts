import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '@/modules/app.module';
import { Initializer } from '@/shared/common/initializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  new Initializer(app).run();

  const PORT = configService.get('common.port') || 5000;

  await app.listen(PORT);
}
bootstrap();
