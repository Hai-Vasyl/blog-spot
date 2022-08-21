import { Route as RouteElem } from 'react-router-dom';

import { RoleEnum } from '../../enums/role.enum';

export class Route {
  path: string;
  element: any;
  title: string;
  roles: RoleEnum[];

  constructor(path: string, element: any, title: string, roles?: RoleEnum[]) {
    this.path = path;
    this.element = element;
    this.title = title;
    this.roles = roles || Object.values(RoleEnum);
  }

  public getElement(role: RoleEnum) {
    if (this.roles.includes(role)) {
      return (
        <RouteElem
          key={this.path}
          path={this.path}
          element={<this.element title={this.title} />}
        />
      );
    } else {
      return null;
    }
  }
}
