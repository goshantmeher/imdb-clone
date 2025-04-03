import { SchemaTypeOptions } from 'mongoose';

export interface IDataEachObjectScheme {
   field_type: string;
   allowEmptyString?: boolean;
   minLength?: number;
   maxLength?: number;
   errorMessage?: string;
}

export type IDataObjectScheme = IDataEachObjectScheme[];

export interface ISchemaTypeOptions extends SchemaTypeOptions<any>, Partial<IDataEachObjectScheme> {}
