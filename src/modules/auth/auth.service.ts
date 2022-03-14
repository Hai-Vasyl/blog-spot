import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { UserRepository } from '@/modules/users/user.repository';
import { User } from '@/modules/users/user.entity';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { mapErrorResponse } from '@/shared/helpers/map-error-response';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async validateLogin(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      email: loginUserDTO.email,
    });

    if (!user) {
      throw new UnprocessableEntityException(
        mapErrorResponse({
          field: 'email',
          message: 'User with this email does not exist!',
        }),
      );
    }

    const isMatch = await bcrypt.compare(loginUserDTO.password, user.password);

    if (!isMatch) {
      throw new UnprocessableEntityException(
        mapErrorResponse({
          field: 'password',
          message: 'Password is wrong!',
        }),
      );
    }

    return user;
  }

  public async validateRegister(
    registerUserDTO: RegisterUserDTO,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      email: registerUserDTO.email,
    });

    if (user) {
      throw new UnprocessableEntityException(
        mapErrorResponse({
          field: 'email',
          message: 'User with this email already exists!',
        }),
      );
    }
  }
}
