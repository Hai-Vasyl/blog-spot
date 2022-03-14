import { RegisterUserValidationDTO } from '@/modules/users/dto/validation/regsiter-user-validation.dto';
import { ValidationMiddleware } from '@/shared/middlewares/validation.middleware';

export class RegisterValidationMiddleware extends ValidationMiddleware {
  protected readonly dto = new RegisterUserValidationDTO();
}
