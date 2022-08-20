import { Schema } from 'mongoose';

export class Feature {
  public name: string;
  public schema: Schema;

  public constructor(name: string, schema: Schema) {
    this.name = name;
    this.schema = schema;
  }
}
