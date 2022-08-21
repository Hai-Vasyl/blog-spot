import { Route } from '../common/classes/route.class';
import { RoleEnum } from '../enums/role.enum';

export const renderRoutes = (role: RoleEnum, routes: Route[]) => {
  return routes.map((route) => {
    return route.getElement(role);
  });
};
