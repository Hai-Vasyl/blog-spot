import React from 'react';
import { CascadeStyle } from '../../../../helpers/cascade-style.class';

import NavLink, { INavLinkProps } from '../nav-link/NavLink';

const NavDropdownLink: React.FC<INavLinkProps> = ({
  to,
  name,
  icon,
  end,
  styles,
}) => {
  const s = new CascadeStyle(null, styles);

  return (
    <NavLink
      to={to}
      icon={icon}
      name={name}
      styles={s.getCascade()}
      end={end}
    />
  );
};

export default NavDropdownLink;
