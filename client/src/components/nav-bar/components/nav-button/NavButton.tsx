import React from 'react';

import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';
import style from '../nav-link/nav-link.module.scss';

export interface INavButtonProps {
  icon: string;
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: IStyle[];
}

const NavButton: React.FC<INavButtonProps> = ({
  icon,
  name,
  onClick,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <button onClick={onClick} className={s.getClass('nav-link')}>
      <span
        className={`material-symbols-outlined ${s.getClass('nav-link__icon')}`}
      >
        {icon}
      </span>
      <span className={s.getClass('nav-link__name')}>{name}</span>
    </button>
  );
};

export default NavButton;
