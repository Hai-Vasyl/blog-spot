import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '@/modules/auth/auth.service';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';
import { getRandomColor } from '@/shared/helpers/get-random-color';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  private async createUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = new this.userRepository.model({
      ...registerUserDTO,
      color: getRandomColor(),
    });

    return user.save();
  }

  public async login(user: User): Promise<JwtTokenResponseDTO> {
    return this.authService.login(user._id);
  }

  public async register(
    registerUserDTO: RegisterUserDTO,
  ): Promise<JwtTokenResponseDTO> {
    await this.authService.validateRegister(registerUserDTO);

    const password = await bcrypt.hash(registerUserDTO.password, 10);

    const user = await this.createUser({ ...registerUserDTO, password });

    return this.authService.login(user._id);
  }
}
