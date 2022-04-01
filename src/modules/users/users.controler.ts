import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '@/modules/users/users.service';
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';
import { LoggerService } from '@/shared/modules/logger/logger.service';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('UsersController');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async users() {
    this.logger.log('Get all users!');

    return Promise.resolve([
      { firstName: 'Tom', lastName: 'Navor' },
      { firstName: 'Jhon', lastName: 'Lineln' },
      { firstName: 'Oliver', lastName: 'Brand' },
    ]);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/login')
  public async login(@Req() req: Request): Promise<JwtTokenResponseDTO> {
    return this.usersService.login(req.user as User);
  }

  @Post('/register')
  public async register(
    @Body() registerUserDTO: RegisterUserDTO,
  ): Promise<JwtTokenResponseDTO> {
    return this.usersService.register(registerUserDTO);
  }
}
