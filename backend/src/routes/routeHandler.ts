import { Application, NextFunction, Request, Response } from 'express';
import ERROR_CONSTANTS from '../utils/constants/error-constants';
import ROUTE_CONSTANTS from '../utils/constants/route-constants';
import { createError } from '../utils/error/errorHelper';
import userRoutes from './user/';

const initAllRoutes = (app: Application) => {
   app.use(ROUTE_CONSTANTS.API_ENDPOINT.USER, userRoutes);

   //404 handler and pass to error handler
   app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(ERROR_CONSTANTS.NOT_FOUND));
   });
};

export default initAllRoutes;
