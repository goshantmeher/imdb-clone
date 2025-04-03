import { NextFunction, Request, Response } from 'express';
import ERROR_CONSTANTS from '../utils/constants/error-constants';
import { createError, IError } from '../utils/error/errorHelper';

export const ControllerWrap = async (callback: Function, req: Request, res: Response, next: NextFunction) => {
   try {
      const actionResult = await callback();
      if ([ERROR_CONSTANTS.CREATED.code, ERROR_CONSTANTS.OK.code].includes(actionResult.code)) {
         res.status(actionResult.code).json({
            message: actionResult.message,
            data: actionResult.data,
            success: true,
         });
      } else {
         next(createError(actionResult as IError));
      }
   } catch (error) {
      next(createError(ERROR_CONSTANTS.INTERNAL_SERVER_ERROR));
   }
};
