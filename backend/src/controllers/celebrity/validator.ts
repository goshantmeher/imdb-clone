import { NextFunction, Request, Response } from 'express';
import { ICelebrity, validateCelebrity } from '../../models/celebrity/celebrityModel';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { createError } from '../../utils/error/errorHelper';
import { getCelebrityAction } from './helper';

export const validateAddCelebrity = (req: Request, res: Response, next: NextFunction) => {
   try {
      const body = req.body;
      body.createdBy = req.user?.id;
      const validationResult = validateCelebrity(body, true);
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      }

      next();
   } catch (error) {
      next(error);
   }
};

export const validateUpdateCelebrity = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const body: ICelebrity = req.body;
      delete body.createdBy;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;

      const validationResult = validateCelebrity(body);
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      }

      const existingCelebrity = await getCelebrityAction(req.params.ID);
      if (existingCelebrity.data === null) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND));
      }
      if (`${existingCelebrity.data?.createdBy}` !== req.user?.id) {
         return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
      }

      next();
   } catch (error) {
      next(error);
   }
};
