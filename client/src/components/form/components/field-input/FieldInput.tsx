import React from 'react';
import { FieldTypeEnum } from '../../enums/fiel-type.enum';
import { IForm, SetForm } from '../../interfaces';
import FieldMessage from '../field-message/FieldMessage';
import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';
import style from './field-input.module.scss';
import useStore from '../../../../hooks/useStore';
import auth from '../../../auth/auth.slice';

interface IFieldInputProps {
  name: string;
  type: FieldTypeEnum;
  hidden: boolean;
  value: string;
  placeholder: string;
  title: string;
  message: string;
  important: boolean;
  setForm: SetForm;
  clearError: (field: string) => void;
  styles?: IStyle[];
}

const FieldInput: React.FC<IFieldInputProps> = ({
  name,
  type,
  hidden,
  value,
  placeholder,
  title,
  message,
  important,
  setForm,
  styles,
  clearError,
}) => {
  const s = new CascadeStyle(style, styles);

  const { call } = useStore();

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    call(auth.act.clearMessage({ field: name }));

    setForm((prev: IForm) =>
      prev.map((field) => {
        if (field.name === name) {
          Object.assign(field, { value });
        }

        return field;
      }),
    );
  };

  return (
    <div className={s.getClass('field-input', hidden && 'field-input--hidden')}>
      <div className={s.getClass('field-input__row-label')}>
        <label className={s.getClass('field-input__label')}>
          {title}
          {important && <sup>*</sup>}
        </label>
        {message && <FieldMessage message={message} styles={s.getCascade()} />}
      </div>
      <div
        className={s.getClass(
          'field-input__row-input',
          message && 'field-input--error',
        )}
      >
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChangeField}
        />
      </div>
    </div>
  );
};

export default FieldInput;
