import { NavLink as NavLinkElem } from 'react-router-dom';

interface IActiveClassName {
  isActive: boolean;
}

export class NavLink {
  to: string;
  name: string;
  className = '';
  activeClassName = '';
  children: NavLink[] = [];

  public constructor(to: string, name: string, children: NavLink[]) {
    this.to = to;
    this.name = name;
    this.children = children;
  }

  private getClassName({ isActive }: IActiveClassName) {
    return isActive
      ? `${this.className} ${this.activeClassName}`
      : this.className;
  }

  public setClassNames(className: string, activeClassName: string) {
    this.className = className;
    this.activeClassName = activeClassName;

    return this;
  }

  public getElement() {
    return (
      <NavLinkElem to={this.to} className={this.getClassName}>
        {this.name}
      </NavLinkElem>
    );
  }
}
