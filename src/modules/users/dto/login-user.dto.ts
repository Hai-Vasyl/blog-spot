import { emailRegex } from '@/shared/regex/email';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginUserDTO {
  @Matches(emailRegex, {
    message: 'Field "Email" is not correct',
  })
  @IsNotEmpty({
    message: 'Field "Email" cannot be empty',
  })
  public email: string;

  @MinLength(4, {
    message: 'Field "Password" must be more than 4 characters',
  })
  @IsNotEmpty({
    message: 'Field "Password" cannot be empty',
  })
  public password: string;
}
