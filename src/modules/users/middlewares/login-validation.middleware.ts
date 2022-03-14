import { LoginUserValidationDTO } from '@/modules/users/dto/validation/login-user-validation.dto';
import { ValidationMiddleware } from '@/shared/middlewares/validation.middleware';

export class LoginValidationMiddleware extends ValidationMiddleware {
  protected readonly dto = new LoginUserValidationDTO();
}
