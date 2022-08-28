import React from 'react';

import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';
import style from './button-action.module.scss';

interface IButtonActionProps {
  icon: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: IStyle[];
}

const ButtonAction: React.FC<IButtonActionProps> = ({
  icon,
  onClick,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <button onClick={onClick} className={s.getClass('btn-action')}>
      <span
        className={`material-symbols-outlined ${s.getClass(
          'btn-action__icon',
        )}`}
      >
        {icon}
      </span>
    </button>
  );
};

export default ButtonAction;
