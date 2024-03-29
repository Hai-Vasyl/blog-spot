import React, { ReactNode } from 'react';
import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';

import style from '../nav-link/nav-link.module.scss';

interface INavDropdownProps {
  button: ReactNode;
  children: ReactNode;
  styles?: IStyle[];
}

const NavDropdown: React.FC<INavDropdownProps> = ({
  children,
  button,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <div className={s.getClass('nav-dropdown')}>
      <div className={s.getClass('nav-link', 'nav-dropdown__btn')}>
        {button}
      </div>
      <div className={s.getClass('nav-dropdown__menu')}>{children}</div>
    </div>
  );
};

export default NavDropdown;
