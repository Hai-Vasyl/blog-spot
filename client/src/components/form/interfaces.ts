import { ReactNode } from 'react';
import { IStyle } from '../../helpers/cascade-style.class';
import { FieldTypeEnum } from './enums/fiel-type.enum';

export type SetForm = React.Dispatch<React.SetStateAction<any>>;
export type SetFormMatch<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IField {
  name: string;
  type: FieldTypeEnum;
  hidden: boolean;
  value: string;
  placeholder: string;
  title: string;
  message: string;
  important: boolean;
  getElement: (setForm: SetForm, styles?: IStyle[]) => ReactNode;
}

export type IForm = IField[];
