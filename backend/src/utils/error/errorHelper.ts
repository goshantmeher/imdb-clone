import createHttpError from 'http-errors';

export interface IError {
   code: number;
   message: string;
   Description: string;
}
export const createError = (errorObject: IError, message?: string) => {
   message = message || errorObject.message;

   const error = createHttpError(errorObject.code, message);
   return error;
};
