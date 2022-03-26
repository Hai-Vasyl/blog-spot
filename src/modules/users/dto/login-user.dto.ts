import { emailRegex } from '@/shared/regex/email';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({
    message: 'Field "Email" cannot be empty',
  })
  @Matches(emailRegex, {
    message: 'Field "Email" is not correct',
  })
  public email: string;

  @IsNotEmpty({
    message: 'Field "Password" cannot be empty',
  })
  @MinLength(4, {
    message: 'Field "Password" must be more than 4 characters',
  })
  public password: string;
}
