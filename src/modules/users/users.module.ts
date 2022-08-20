import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from '@/modules/users/users.controler';
import { UsersService } from '@/modules/users/users.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { LoggerModule } from '@/shared/modules/logger/logger.module';
import { UserRepository } from './user.repository';
import { UserFeature } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    LoggerModule,
    MongooseModule.forFeature([UserFeature]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [MongooseModule, UserRepository],
})
export class UsersModule {}
