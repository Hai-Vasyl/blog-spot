import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { Request } from 'express';
import { User } from '@/modules/users/user.entity';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

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
