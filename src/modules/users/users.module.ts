import { Module } from '@nestjs/common';

import { UsersController } from '@/modules/users/users.controler';
import { UsersService } from '@/modules/users/users.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { LoggerModule } from '@/shared/modules/logger/logger.module';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
