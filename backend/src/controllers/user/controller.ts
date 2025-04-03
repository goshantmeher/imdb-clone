import { NextFunction, Request, Response } from 'express';
import { createUserAction, loginAction } from './helper';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { createError, IError } from '../../utils/error/errorHelper';

export default {
   get: async (req: Request, res: Response, next: NextFunction) => {},
   post: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const actionResult = await createUserAction(req, res);
         if (actionResult.code === ERROR_CONSTANTS.CREATED.code) {
            res.status(actionResult.code).json({
               message: actionResult.message,
               data: actionResult.data,
            });
         } else {
            next(createError(actionResult as IError));
         }
      } catch (error) {
         next(createError(ERROR_CONSTANTS.INTERNAL_SERVER_ERROR));
      }
   },
   patch: async (req: Request, res: Response, next: NextFunction) => {},
   login: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const actionResult = await loginAction(req, res);
         if (actionResult.code === ERROR_CONSTANTS.OK.code) {
            res.status(actionResult.code).json({
               message: actionResult.message,
               data: actionResult.data,
            });
         } else {
            next(createError(actionResult as IError));
         }
      } catch (error) {
         next(createError(ERROR_CONSTANTS.INTERNAL_SERVER_ERROR));
      }
   },
};
