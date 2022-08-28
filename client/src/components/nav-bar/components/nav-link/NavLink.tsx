import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';
import style from './nav-link.module.scss';

interface IActiveClassName {
  isActive: boolean;
}

export interface INavLinkProps {
  to: string;
  icon: string;
  name: string;
  end?: boolean;
  styles?: IStyle[];
}

const NavLink: React.FC<INavLinkProps> = ({
  to,
  name,
  icon,
  end = false,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  const getClassName = ({ isActive }: IActiveClassName) => {
    return s.getClass('nav-link', isActive && 'nav-link--active');
  };

  return (
    <Link to={to} className={getClassName} end={end}>
      <span
        className={`material-symbols-outlined ${s.getClass('nav-link__icon')}`}
      >
        {icon}
      </span>
      <span className={s.getClass('nav-link__name')}>{name}</span>
    </Link>
  );
};

export default NavLink;
