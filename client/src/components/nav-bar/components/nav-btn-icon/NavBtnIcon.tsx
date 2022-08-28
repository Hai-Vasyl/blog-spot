import React from 'react';
import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';

import style from '../nav-link/nav-link.module.scss';

interface INavBtnIconProps {
  icon: string;
  styles?: IStyle[];
}

const NavBtnIcon: React.FC<INavBtnIconProps> = ({ styles, icon }) => {
  const s = new CascadeStyle(style, styles);

  return (
    <span
      className={`material-symbols-outlined ${s.getClass('nav-link__icon')}`}
    >
      {icon}
    </span>
  );
};

export default NavBtnIcon;
