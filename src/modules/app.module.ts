import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { initModules } from '@/modules/init/init.module';
import { UsersModule } from '@/modules/users/users.module';
import { RegisterValidationMiddleware } from '@/modules/users/middlewares/register-validation.middleware';
import { LoginValidationMiddleware } from '@/modules/users/middlewares/login-validation.middleware';
import { LoggerMiddleware } from '@/shared/modules/logger/middlawares/logger.middleware';
import { FilesModule } from './files/files.module';

@Module({
  imports: [...initModules, AuthModule, UsersModule, FilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RegisterValidationMiddleware)
      .forRoutes({ path: '/users/register', method: RequestMethod.POST });
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes({ path: '/users/login', method: RequestMethod.GET });
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
