import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '@/modules/auth/auth.service';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  public async login(): Promise<string> {
    return Promise.resolve('user logged in');
  }

  public async register(registerUserDTO: RegisterUserDTO): Promise<string> {
    await this.authService.validateRegister(registerUserDTO);

    const password = await bcrypt.hash(registerUserDTO.password, 10);

    const user = new User();
    Object.assign(user, { ...registerUserDTO, password });

    const created = await user.save();

    return Promise.resolve('user registered in');
  }
}
