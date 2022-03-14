import { RoleEnum } from '@/modules/users/enums/role.enum';

export class RegisterUserDTO {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role?: RoleEnum;
}
