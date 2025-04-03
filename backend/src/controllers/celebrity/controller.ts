import { NextFunction, Request, Response } from 'express';
import { createCelebrityAction, filterGetCelebrityAction, getCelebrityAction, updateCelebrityAction } from './helper';
import { ControllerWrap } from '../helper';

export default {
   get: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const id = req.params.ID;
            return getCelebrityAction(id);
         },
         req,
         res,
         next,
      );
   },
   getByFilter: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => filterGetCelebrityAction(req, res), req, res, next);
   },
   post: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => createCelebrityAction(req, res), req, res, next);
   },
   patch: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => updateCelebrityAction(req, res), req, res, next);
   },
};
