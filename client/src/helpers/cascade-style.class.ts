export interface IStyle {
  [key: string]: string;
}

export class CascadeStyle {
  private initStyle: IStyle | null;
  private cascadeStyles: IStyle[];

  public constructor(initStyle: IStyle | null, cascadeStyles: IStyle[] = []) {
    this.initStyle = initStyle;
    this.cascadeStyles = cascadeStyles;
  }

  public getCascade() {
    if (this.initStyle === null) {
      return this.cascadeStyles;
    }
    return [this.initStyle, ...this.cascadeStyles];
  }

  public getClass(...classNames: Array<string | boolean | null | undefined>) {
    const filteredClasses: Array<string | any> = classNames.filter(
      (className) => typeof className === 'string' && !!className,
    );

    return filteredClasses
      .reduce((acumulator, className) => {
        acumulator += this.getCascade().reduce((acumStyle, style) => {
          acumStyle += `${style[className]} `;

          return acumStyle;
        }, '');

        return acumulator;
      }, '')
      .trim();
  }
}
