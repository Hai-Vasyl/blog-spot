import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { initModules } from '@/modules/init/init.module';
import { UsersModule } from '@/modules/users/users.module';
import { LoggerMiddleware } from '@/shared/modules/logger/middlawares/logger.middleware';
import { FilesModule } from './files/files.module';

@Module({
  imports: [...initModules, AuthModule, UsersModule, FilesModule],
})
export class AppModule implements NestModule {
  public constructor(private dataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
