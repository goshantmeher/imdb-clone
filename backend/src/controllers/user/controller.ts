import { NextFunction, Request, Response } from 'express';
import { createUserAction, getLoggedInUser, loginAction, logoutAction } from './helper';
import { ControllerWrap } from '../helper';

export default {
   get: async (req: Request, res: Response, next: NextFunction) => {},
   post: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => createUserAction(req, res), req, res, next);
   },
   patch: async (req: Request, res: Response, next: NextFunction) => {},
   login: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => loginAction(req, res), req, res, next);
   },
   logout: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => logoutAction(req, res), req, res, next);
   },
   getLoggedInUser: async (req: Request, res: Response, next: NextFunction) => {
      ControllerWrap(() => getLoggedInUser(req, res), req, res, next);
   },
};
