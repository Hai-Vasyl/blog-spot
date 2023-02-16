import { emailRegex } from '@/shared/regex/email';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';

export class LoginUserDTO {
  @Validate(IsEmailUnique)
  @Matches(emailRegex, {
    message: 'Field "Email" is not correct',
  })
  @IsString({
    message: 'Field "Email" is not String type',
  })
  @IsNotEmpty({
    message: 'Field "Email" cannot be empty',
  })
  public email: string;

  @MinLength(4, {
    message: 'Field "Password" must be more than 4 characters',
  })
  @IsString({
    message: 'Field "Password" is not String type',
  })
  @IsNotEmpty({
    message: 'Field "Password" cannot be empty',
  })
  public password: string;
}
