import React from 'react';

import { ButtonTypeEnum } from './enums/button-type.enum';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';
import style from './button-primary.module.scss';

export interface IButtonPrimaryProps {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  styles?: IStyle[];
  type?: ButtonTypeEnum;
  iconRight?: boolean;
  disabled?: false;
}

const ButtonPrimary: React.FC<IButtonPrimaryProps> = ({
  onClick,
  name,
  icon,
  styles,
  type = ButtonTypeEnum.BUTTON,
  iconRight = false,
  disabled,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <button
      onClick={onClick}
      className={s.getClass('btn', iconRight && 'btn--icon-right')}
      type={type}
      disabled={disabled}
    >
      {icon && (
        <span
          className={`material-symbols-outlined ${s.getClass('btn__icon')}`}
        >
          {icon}
        </span>
      )}
      <span className={s.getClass('btn__name')}>{name}</span>
    </button>
  );
};

export default ButtonPrimary;
