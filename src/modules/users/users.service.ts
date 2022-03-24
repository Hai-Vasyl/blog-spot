import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '@/modules/auth/auth.service';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';
import { getRandomColor } from '@/shared/helpers/get-random-color';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  public async login(user: User): Promise<JwtTokenResponseDTO> {
    return this.authService.login(user.id);
  }

  public async register(
    registerUserDTO: RegisterUserDTO,
  ): Promise<JwtTokenResponseDTO> {
    await this.authService.validateRegister(registerUserDTO);

    const password = await bcrypt.hash(registerUserDTO.password, 10);

    const user = new User();
    Object.assign(user, {
      ...registerUserDTO,
      password,
      color: getRandomColor(),
    });

    const newUser = await user.save();

    return this.authService.login(newUser.id);
  }
}
