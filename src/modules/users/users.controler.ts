import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { Request } from 'express';

import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';
import { LoggerService } from '@/shared/modules/logger/logger.service';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('UsersController');
  }

  @Get()
  public async users() {
    this.logger.log({
      params: { user: 'Get all users!' },
      field: { user1: 'Get all users!' },
    });

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
