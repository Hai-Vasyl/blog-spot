import React from 'react';
import { CascadeStyle } from '../../helpers/cascade-style.class';

import ButtonPrimary, {
  IButtonPrimaryProps,
} from '../button-primary/ButtonPrimary';

import style from './button-light.module.scss';

const ButtonLight: React.FC<IButtonPrimaryProps> = ({
  onClick,
  name,
  icon,
  styles,
  type,
  iconRight,
  disabled,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <ButtonPrimary
      onClick={onClick}
      name={name}
      icon={icon}
      styles={s.getCascade()}
      type={type}
      iconRight={iconRight}
      disabled={disabled}
    />
  );
};

export default ButtonLight;
