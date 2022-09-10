import React, { ReactNode } from 'react';

import { FormState, IField } from './interfaces';
import style from './form.module.scss';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';
import Loader from '../loader/Loader';
import { IError } from '../../common/interfaces/main';

export interface IFormSubmitArgs {
  [key: string]: string;
}

interface IFormProp {
  title: string;
  state: FormState;
  children: ReactNode;
  onSubmit: (args: IFormSubmitArgs) => void;
  styles?: IStyle[];
  loading?: boolean;
  errors: IError[];
  clearError: (field: string) => void;
}

const Form: React.FC<IFormProp> = ({
  title,
  state,
  children,
  onSubmit,
  styles,
  loading,
  errors,
  clearError,
}) => {
  const s = new CascadeStyle(style, styles);

  const [form, setForm] = state;

  const getErrorForField = (field: IField) => {
    if (Array.isArray(errors)) {
      return errors?.find((error) => error.field === field.name);
    }

    return undefined;
  };

  const getFieldMarkup = (field: IField, message?: string) => {
    return field.getElement(setForm, s.getCascade(), clearError, message);
  };

  const renderFields = () => {
    if (errors.length) {
      return form.map((field) => {
        const error = getErrorForField(field);
        return getFieldMarkup(field, error?.message);
      });
    }

    return form.map((field) => {
      return getFieldMarkup(field);
    });
  };

  const fieldsRendered = renderFields();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formArgs = form.reduce((acumulator: IFormSubmitArgs, field) => {
      acumulator[field.name] = field.value;

      return acumulator;
    }, {});

    onSubmit(formArgs);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={s.getClass('form', loading && 'form--loading')}
    >
      <Loader loading={!!loading} />
      <div className={s.getClass('form__title')}>
        <h2>{title}</h2>
      </div>
      <div className={s.getClass('form__fields')}>{fieldsRendered}</div>
      <div className={s.getClass('form__buttons')}>{children}</div>
    </form>
  );
};

export default Form;
