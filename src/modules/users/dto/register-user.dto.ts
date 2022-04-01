import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { RoleEnum } from '@/modules/users/enums/role.enum';

export class RegisterUserDTO extends LoginUserDTO {
  @MaxLength(30, {
    message: 'Field "First name" must be no more than 30 characters',
  })
  @IsNotEmpty({
    message: 'Field "First name" cannot be empty',
  })
  public firstName: string;

  @MaxLength(30, {
    message: 'Field "Last name" must be no more than 30 characters',
  })
  @IsNotEmpty({
    message: 'Field "Last name" cannot be empty',
  })
  public lastName: string;

  @IsOptional()
  @IsEnum(RoleEnum, {
    message: 'Field "Role" is invalid',
  })
  public role?: RoleEnum;
}
