import { NextFunction, Request, Response } from 'express';
import {
   addActorToMovieAction,
   createMovieAction,
   filterGetMovieAction,
   getMovieAction,
   removeActorFromMovieAction,
   updateMovieAction,
} from './helper';
import { ControllerWrap } from '../helper';

export default {
   get: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const id = req.params.ID;
            return getMovieAction(id);
         },
         req,
         res,
         next,
      );
   },
   getByFilter: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => filterGetMovieAction(req, res), req, res, next);
   },
   post: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => createMovieAction(req, res), req, res, next);
   },
   patch: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => updateMovieAction(req, res), req, res, next);
   },
   addActorToMovie: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const { actor_id } = req.body;
            const id = req.params.ID;
            return addActorToMovieAction(id, actor_id);
         },
         req,
         res,
         next,
      );
   },
   removeActorToMovie: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const { actor_id } = req.body;
            const id = req.params.ID;
            return removeActorFromMovieAction(id, actor_id);
         },
         req,
         res,
         next,
      );
   },
};
