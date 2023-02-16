import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from '@/modules/users/users.controler';
import { UsersService } from '@/modules/users/users.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { LoggerModule } from '@/shared/modules/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/user.entity';
import { UserRepository } from '@/modules/users/user.repository';

@Module({
  imports: [
    // forwardRef(() => ),
    AuthModule,
    LoggerModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
