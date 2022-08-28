import React from 'react';

import NavButton, { INavButtonProps } from '../nav-button/NavButton';
import { CascadeStyle } from '../../../../helpers/cascade-style.class';

const NavDropdownButton: React.FC<INavButtonProps> = ({
  icon,
  name,
  onClick,
  styles,
}) => {
  const s = new CascadeStyle(null, styles);

  return (
    <NavButton
      icon={icon}
      name={name}
      onClick={onClick}
      styles={s.getCascade()}
    />
  );
};

export default NavDropdownButton;
