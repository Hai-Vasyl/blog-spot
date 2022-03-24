import { LoginUserDTO } from '@/modules/users/dto/login-user.dto';
import { ValidationMiddleware } from '@/shared/middlewares/validation.middleware';

export class LoginValidationMiddleware extends ValidationMiddleware {
  protected readonly dto = new LoginUserDTO();
}
