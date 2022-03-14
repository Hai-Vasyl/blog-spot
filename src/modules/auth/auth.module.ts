import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@/modules/auth/auth.service';
import { UserRepository } from '@/modules/users/user.repository';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
