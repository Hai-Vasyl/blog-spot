import { IStyle } from '../../../../helpers/cascade-style.class';
import { FieldTypeEnum } from '../../enums/fiel-type.enum';
import { SetForm } from '../../interfaces';
import FieldInput from './FieldInput';

export interface IFieldInputModelInput {
  name: string;
  type?: FieldTypeEnum;
  hidden?: boolean;
  placeholder?: string;
  important?: boolean;
  title: string;
}

export class FieldInputModel {
  name: string;
  hidden: boolean;
  type: FieldTypeEnum;
  value = '';
  placeholder: string;
  title: string;
  important: boolean;

  public constructor({
    name,
    type,
    hidden,
    placeholder,
    important,
    title,
  }: IFieldInputModelInput) {
    this.name = name;
    this.title = title;
    this.hidden = hidden || false;
    this.type = type || FieldTypeEnum.TEXT;
    this.placeholder = placeholder || '';
    this.important = important || false;
  }

  public getElement(
    setForm: SetForm,
    styles: IStyle[] = [],
    clearError: (field: string) => void,
    message?: string,
  ) {
    return (
      <FieldInput
        key={this.name}
        name={this.name}
        value={this.value}
        title={this.title}
        hidden={this.hidden}
        placeholder={this.placeholder}
        important={this.important}
        type={this.type}
        message={message || ''}
        setForm={setForm}
        styles={styles}
        clearError={clearError}
      />
    );
  }
}
