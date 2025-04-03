import { NextFunction, Request, Response } from 'express';
import {
   addRoleToCelebrity,
   createCelebrityAction,
   filterGetCelebrityAction,
   getCelebrityAction,
   removeRoleFromCelebrity,
   updateCelebrityAction,
} from './helper';
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
      ControllerWrap(() => filterGetCelebrityAction(req.query), req, res, next);
   },
   post: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => createCelebrityAction(req, res), req, res, next);
   },
   patch: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => updateCelebrityAction(req, res), req, res, next);
   },
   addRoleToCelebrity: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const { role } = req.body;
            const id = req.params.ID;
            return addRoleToCelebrity(id, role);
         },
         req,
         res,
         next,
      );
   },
   removeRoleToCelebrity: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(
         () => {
            const { role } = req.body;
            const id = req.params.ID;
            return removeRoleFromCelebrity(id, role);
         },
         req,
         res,
         next,
      );
   },
};
