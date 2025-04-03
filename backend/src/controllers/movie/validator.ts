import { NextFunction, Request, Response } from 'express';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { createError } from '../../utils/error/errorHelper';
import { getMovieAction } from './helper';
import { IMovie, validateMovie } from '../../models/movies/moviesModel';
import { filterGetCelebrityAction } from '../celebrity/helper';
import { getMessage } from '../../utils/constants/message-constants';
import { ACTOR_ROLES } from '../../models/celebrity/celebrityModel';

export const validateAddMovie = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const body: IMovie = req.body;
      body.createdBy = req.user?.id;
      const validationResult = validateMovie(body, true);
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      }

      const actor_ids = body.actor_ids as unknown as string[];

      const actorResponse = await filterGetCelebrityAction({
         page: 1,
         limit: 1,
         role: ACTOR_ROLES[0],
         id: actor_ids.join(','),
      });

      if (actorResponse.code !== ERROR_CONSTANTS.OK.code || actorResponse.data?.pagination.total === 0) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('ACTOR_NOT_FOUND')));
      } else if (actorResponse.data?.pagination.total !== actor_ids.length) {
         const resultList = actorResponse.data?.results;
         const notFoundActorIds = actor_ids.filter((id: string) => {
            return !resultList.some((actor: any) => {
               return `${actor._id}` === id;
            });
         });
         return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('SELECTED_ACTOR_NOT_FOUND', [notFoundActorIds.join(', ')])));
      }

      const producer_id = body.producer_id as unknown as string;
      const producerResponse = await filterGetCelebrityAction({
         page: 1,
         limit: 1,
         role: ACTOR_ROLES[1],
         id: producer_id,
      });

      if (producerResponse.code !== ERROR_CONSTANTS.OK.code || producerResponse.data?.pagination.total === 0) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('PRODUCER_NOT_FOUND')));
      }

      next();
   } catch (error) {
      next(error);
   }
};

export const validateUpdateMovie = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const body: IMovie = req.body;
      delete body.createdBy;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;

      const validationResult = validateMovie(body);
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      } else if (validationResult.code === ERROR_CONSTANTS.VALIDATION_ERROR.code) {
         return next(createError(validationResult));
      }

      const existingMovie = await getMovieAction(req.params.ID);
      if (existingMovie.data === null) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND));
      }
      if (`${existingMovie.data?.createdBy}` !== req.user?.id) {
         return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
      }
      if (body.actor_ids) {
         const actor_ids = body.actor_ids as unknown as string[];

         const actorResponse = await filterGetCelebrityAction({
            page: 1,
            limit: 1,
            role: ACTOR_ROLES[0],
            id: actor_ids.join(','),
         });

         if (actorResponse.code !== ERROR_CONSTANTS.OK.code || actorResponse.data?.pagination.total === 0) {
            return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('ACTOR_NOT_FOUND')));
         } else if (actorResponse.data?.pagination.total !== actor_ids.length) {
            const resultList = actorResponse.data?.results;
            const notFoundActorIds = actor_ids.filter((id: string) => {
               return !resultList.some((actor: any) => {
                  return `${actor._id}` === id;
               });
            });
            return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('SELECTED_ACTOR_NOT_FOUND', [notFoundActorIds.join(', ')])));
         }
      }
      if (body.producer_id) {
         const producer_id = body.producer_id as unknown as string;
         const producerResponse = await filterGetCelebrityAction({
            page: 1,
            limit: 1,
            role: ACTOR_ROLES[1],
            id: producer_id,
         });

         if (producerResponse.code !== ERROR_CONSTANTS.OK.code || producerResponse.data?.pagination.total === 0) {
            return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('PRODUCER_NOT_FOUND')));
         }
      }

      next();
   } catch (error) {
      next(error);
   }
};

export const validateAddActorFromMovie = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { actor_id } = req.body;

      const validationResult = validateMovie({
         actor_ids: [actor_id],
      });
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      } else if (validationResult.code === ERROR_CONSTANTS.VALIDATION_ERROR.code) {
         return next(createError(validationResult));
      }

      const existingMovie = await getMovieAction(req.params.ID);
      if (existingMovie.data === null) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND));
      }
      if (`${existingMovie.data?.createdBy}` !== req.user?.id) {
         return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
      }

      const actorResponse = await filterGetCelebrityAction({
         page: 1,
         limit: 1,
         role: ACTOR_ROLES[0],
         id: actor_id,
      });

      if (actorResponse.code !== ERROR_CONSTANTS.OK.code || actorResponse.data?.pagination.total === 0) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND, getMessage('ACTOR_NOT_FOUND')));
      }

      next();
   } catch (error) {
      next(error);
   }
};

export const validateRemoveActorFromMovie = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { actor_id } = req.body;

      const validationResult = validateMovie({
         actor_ids: [actor_id],
      });
      if (validationResult.code !== ERROR_CONSTANTS.OK.code && validationResult.errors) {
         return next(createError(ERROR_CONSTANTS.VALIDATION_ERROR, JSON.stringify(validationResult.errors)));
      } else if (validationResult.code === ERROR_CONSTANTS.VALIDATION_ERROR.code) {
         return next(createError(validationResult));
      }

      const existingMovie = await getMovieAction(req.params.ID);
      if (existingMovie.data === null) {
         return next(createError(ERROR_CONSTANTS.NOT_FOUND));
      }
      if (`${existingMovie.data?.createdBy}` !== req.user?.id) {
         return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
      }

      next();
   } catch (error) {
      next(error);
   }
};
