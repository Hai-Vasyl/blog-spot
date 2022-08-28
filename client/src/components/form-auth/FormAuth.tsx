import React from 'react';
import { CascadeStyle } from '../../helpers/cascade-style.class';

import { FieldInputModel } from '../form/components/field-input/field-input.model';
import { FieldTypeEnum } from '../form/enums/fiel-type.enum';
import Form, { IFormSubmitArgs } from '../form/Form';
import style from './form-auth.module.scss';

const FormAuth: React.FC = () => {
  const s = new CascadeStyle(style);

  const state = [
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
  ];

  const onSubmit = (args: IFormSubmitArgs) => {
    console.log({ args });
  };

  return (
    <Form
      onSubmit={onSubmit}
      title="Log In Form"
      state={state}
      color="green"
      styles={s.getCascade()}
    >
      <button>Submit</button>
      <button>Swicth to Sign Up</button>
    </Form>
  );
};

export default FormAuth;
