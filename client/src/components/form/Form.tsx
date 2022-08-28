import React, { ReactNode, useState } from 'react';

import { IForm } from './interfaces';

import style from './form.module.scss';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';

export interface IFormSubmitArgs {
  [key: string]: string | boolean;
}

interface IFormProp {
  title: string;
  color: string;
  state: IForm;
  children: ReactNode;
  onSubmit: (args: IFormSubmitArgs) => void;
  styles?: IStyle[];
}

const Form: React.FC<IFormProp> = ({
  title,
  state,
  children,
  color,
  onSubmit,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  const [form, setForm] = useState(state);

  const fieldsRendered = form.map((field) => {
    return field.getElement(setForm, s.getCascade());
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formArgs = form.reduce((acumulator: IFormSubmitArgs, field) => {
      acumulator[field.name] = field.value;

      return acumulator;
    }, {});

    onSubmit(formArgs);
  };

  return (
    <form onSubmit={handleSubmit} className={s.getClass('form')}>
      <div className={s.getClass('form__title')} data-color={color}>
        <h2>{title}</h2>
      </div>
      <div className={s.getClass('form__fields')}>{fieldsRendered}</div>
      <div className={s.getClass('form__buttons')}>{children}</div>
    </form>
  );
};

export default Form;
