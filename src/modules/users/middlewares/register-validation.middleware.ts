import { RegisterUserDTO } from '@/modules/users/dto/register-user.dto';
import { ValidationMiddleware } from '@/shared/middlewares/validation.middleware';

export class RegisterValidationMiddleware extends ValidationMiddleware {
  protected readonly dto = new RegisterUserDTO();
}
