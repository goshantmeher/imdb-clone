import { NextFunction, Request, Response } from 'express';
import ERROR_CONSTANTS from '../../constants/error-constants';
import { createError } from '../../error/errorHelper';
import { getMessage } from '../../constants/message-constants';
import mongoose from 'mongoose';

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
   if (!(typeof req.body === 'object' && Object.keys(req.body).length > 0))
      return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, getMessage('VALIDATION_ERROR_EMPTY_REQUEST_BODY')));
   return next();
};

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.ID;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, getMessage('INVALID_QUERY_ID')));
   }
   return next();
};

export const validateQueryParams = (req: Request, res: Response, next: NextFunction) => {
   if (!(typeof req.query === 'object' && Object.keys(req.query).length > 0))
      return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, getMessage('VALIDATION_ERROR_EMPTY_QUERY_PARAMS')));
   return next();
};
