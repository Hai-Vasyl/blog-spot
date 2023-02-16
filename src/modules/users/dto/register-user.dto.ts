import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Validate,
} from 'class-validator';

import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { GenderEnum } from '@/modules/users/enums/gender.enum';

export class RegisterUserDTO extends LoginUserDTO {
  @MaxLength(30, {
    message: 'Field "First name" must be no more than 30 characters',
  })
  @IsString({
    message: 'Field "First name" is not String type',
  })
  @IsNotEmpty({
    message: 'Field "First name" cannot be empty',
  })
  public firstName: string;

  @MaxLength(30, {
    message: 'Field "Last name" must be no more than 30 characters',
  })
  @IsString({
    message: 'Field "Last name" is not String type',
  })
  @IsNotEmpty({
    message: 'Field "Last name" cannot be empty',
  })
  public lastName: string;

  @IsEnum(GenderEnum, {
    message: 'Field "Gender" is invalid',
  })
  @IsNotEmpty({
    message: 'Field "Gender" cannot be empty',
  })
  public gender: GenderEnum;

  @IsOptional()
  @IsUUID(4, {
    message: 'Field "Role" is not UUID format',
  })
  public role?: string;
}
