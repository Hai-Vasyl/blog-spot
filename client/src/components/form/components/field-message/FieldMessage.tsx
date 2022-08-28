import React from 'react';

import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';
import style from './field-message.module.scss';

interface IFieldMessageProps {
  message: string;
  styles: IStyle[];
}

const FieldMessage: React.FC<IFieldMessageProps> = ({ message, styles }) => {
  const s = new CascadeStyle(style, styles);

  return (
    <div className={s.getClass('message')}>
      <span
        className={`material-symbols-outlined ${s.getClass('message__icon')}`}
      >
        privacy_tip
      </span>
      <span className={s.getClass('message__dialog-box')}>
        <span className={s.getClass('message__triangle')}></span>
        <span className={s.getClass('message__text')}>{message}</span>
      </span>
    </div>
  );
};

export default FieldMessage;
