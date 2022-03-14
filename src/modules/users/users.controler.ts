import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';
import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Get('/login')
  public async login(@Body() loginUserDTO: LoginUserDTO) {
    console.log({ loginUserDTO });
    return this.usersService.login();
  }

  @Post('/register')
  public async register(@Body() registerUserDTO: RegisterUserDTO) {
    return this.usersService.register(registerUserDTO);
  }
}
