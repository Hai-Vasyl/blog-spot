import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '@/modules/auth/auth.service';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { User } from '@/modules/users/user.entity';
import { getRandomColor } from '@/shared/helpers/get-random-color';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';
import { UserRepository } from './user.repository';
import { LoginGoogleUserDTO } from './dto/login-google-user.dto';
import { LoginMethodEnum } from './enums/login-method.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  private async createUser(userData: Partial<User>): Promise<User> {
    const user = new this.userRepository.model({
      ...userData,
      color: getRandomColor(),
    });

    return user.save();
  }

  public async loginGoogle(
    loginGoogleUserDTO: LoginGoogleUserDTO,
  ): Promise<JwtTokenResponseDTO> {
    let user: User = await this.userRepository.model.findOne({
      email: loginGoogleUserDTO.email,
      loginMethod: LoginMethodEnum.GOOGLE,
    });

    if (!user) {
      user = await this.createUser({
        ...loginGoogleUserDTO,
        loginMethod: LoginMethodEnum.GOOGLE,
      });
    }

    return this.authService.login(user._id);
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
