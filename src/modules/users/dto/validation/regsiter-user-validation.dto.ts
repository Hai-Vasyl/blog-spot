import { LoginUserValidationDTO } from '@/modules/users/dto/validation/login-user-validation.dto';
import { RoleEnum } from '@/modules/users/enums/role.enum';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class RegisterUserValidationDTO extends LoginUserValidationDTO {
  @IsNotEmpty({
    message: 'Field "First name" cannot be empty',
  })
  @MaxLength(30, {
    message: 'Field "First name" must be no more than 30 characters',
  })
  public firstName: string;

  @IsNotEmpty({
    message: 'Field "Last name" cannot be empty',
  })
  @MaxLength(30, {
    message: 'Field "Last name" must be no more than 30 characters',
  })
  public lastName: string;

  @IsOptional()
  @IsEnum(RoleEnum, {
    message: 'Field "Role" is invalid',
  })
  public role?: RoleEnum;
}
