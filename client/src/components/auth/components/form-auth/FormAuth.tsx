import React, { useState, useEffect } from 'react';

import ButtonPrimary from '../../../button-primary/ButtonPrimary';
import { FieldInputModel } from '../../../form/components/field-input/field-input.model';
import { FieldTypeEnum } from '../../../form/enums/fiel-type.enum';
import Form, { IFormSubmitArgs } from '../../../form/Form';
import ButtonLight from '../../../button-light/ButtonLight';
import { ButtonTypeEnum } from '../../../button-primary/enums/button-type.enum';

import { CascadeStyle } from '../../../../helpers/cascade-style.class';
import style from './form-auth.module.scss';
import useStore from '../../../../hooks/useStore';
import authSlice from '../../auth.slice';

const { api, act } = authSlice;

enum FormType {
  REGISTER = 'register',
  LOGIN = 'login',
}

const FormAuth: React.FC = () => {
  const s = new CascadeStyle(style);
  const {
    call,
    state: { auth },
  } = useStore();

  const [formType, setFormType] = useState(FormType.LOGIN);
  const formState = useState([
    new FieldInputModel({
      name: 'firstName',
      type: FieldTypeEnum.TEXT,
      hidden: true,
      title: 'First Name',
    }),
    new FieldInputModel({
      name: 'lastName',
      type: FieldTypeEnum.TEXT,
      hidden: true,
      title: 'Last Name',
    }),
    new FieldInputModel({
      name: 'email',
      type: FieldTypeEnum.EMAIL,
      title: 'Email',
    }),
    new FieldInputModel({
      name: 'password',
      type: FieldTypeEnum.PASSWORD,
      title: 'Password',
    }),
  ]);
  const [, setForm] = formState;
  const isLoginForm = formType === FormType.LOGIN;

  useEffect(() => {
    const formStatesRaw = {
      states: [
        {
          type: FormType.REGISTER,
          fields: ['firstName', 'lastName'],
          hidden: false,
        },
        {
          type: FormType.LOGIN,
          fields: ['firstName', 'lastName'],
          hidden: true,
        },
      ],
    };

    setForm((prev) =>
      prev.map((field) => {
        for (const state of formStatesRaw.states) {
          if (formType === state.type && state.fields.includes(field.name)) {
            Object.assign(field, { hidden: state.hidden, message: '' });
          }
        }
        return field;
      }),
    );
  }, [formType, setForm]);

  const handleSwapForm = () => {
    setFormType((prev) => {
      if (prev === FormType.REGISTER) {
        return FormType.LOGIN;
      }
      return FormType.REGISTER;
    });
  };

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: IFormSubmitArgs) => {
    if (isLoginForm) {
      call(api.login({ email, password }));
    } else {
      call(api.register({ firstName, lastName, email, password }));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      title={isLoginForm ? 'Welcome Back!' : 'Create Account'}
      state={formState}
      styles={s.getCascade()}
      loading={auth.loading}
      clearError={act.clearMessage}
      errors={auth.errors}
    >
      <ButtonPrimary
        name={isLoginForm ? 'Sign In' : 'Sign Up'}
        type={ButtonTypeEnum.SUBMIT}
      />
      <ButtonLight
        name={isLoginForm ? 'Sign Up' : 'Sign In'}
        onClick={handleSwapForm}
      />
    </Form>
  );
};

export default FormAuth;
