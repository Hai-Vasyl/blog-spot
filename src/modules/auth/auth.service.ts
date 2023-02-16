import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { UserRepository } from '@/modules/users/user.repository';
import { User } from '@/modules/users/user.entity';
import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { mapErrorResponse } from '@/shared/helpers/map-error-response';
import { JwtTokenResponseDTO } from '@/modules/users/dto/jwt-token-response.dto';
// import { LoginGoogleUserDTO } from '../users/dto/login-google-user.dto';
import { LoginMethodEnum } from '../users/enums/login-method.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async validateLogin(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.model.findOne({
      email: loginUserDTO.email,
      loginMethod: LoginMethodEnum.LOCAL,
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
    const user = await this.userRepository.model.findOne({
      email: registerUserDTO.email,
      loginMethod: LoginMethodEnum.LOCAL,
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

  // public async validateGoogleLogin(loginGoogleUserDTO: LoginGoogleUserDTO): Promise<User> {
  //   const user = await this.userRepository.model.findOne({
  //     email: loginGoogleUserDTO.email,
  //   });

  //   if (!user) {
  //     throw new UnprocessableEntityException(
  //       mapErrorResponse({
  //         field: 'email',
  //         message: 'User with this email does not exist!',
  //       }),
  //     );
  //   }

  //   const isMatch = await bcrypt.compare(loginUserDTO.password, user.password);

  //   if (!isMatch) {
  //     throw new UnprocessableEntityException(
  //       mapErrorResponse({
  //         field: 'password',
  //         message: 'Password is wrong!',
  //       }),
  //     );
  //   }

  //   return user;
  // }

  public async login(sub: string) {
    return new JwtTokenResponseDTO(this.jwtService.sign({ sub }));
  }
}
