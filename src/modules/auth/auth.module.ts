import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@/modules/auth/auth.service';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { UserRepository } from '../users/user.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
    ConfigModule,
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
