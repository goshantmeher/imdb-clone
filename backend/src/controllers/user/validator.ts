import { NextFunction, Request, Response } from 'express';
import { createError } from '../../utils/error/errorHelper';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { getMessage } from '../../utils/constants/message-constants';
import { validateUser } from '../../models/user/userModel';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, getMessage('EMAIL_PASSWORD_REQUIRED')));
      }
      const validationResult = validateUser({ email, password });
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      }

      next();
   } catch (error) {
      next(error);
   }
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, password, name } = req.body;

      const validationResult = validateUser({ email, password, name }, true);
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      }

      next();
   } catch (error) {
      next(error);
   }
};
