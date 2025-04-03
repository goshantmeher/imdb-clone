import { Application, NextFunction, Request, Response } from 'express';
import ERROR_CONSTANTS from '../utils/constants/error-constants';
import ROUTE_CONSTANTS from '../utils/constants/route-constants';
import { createError } from '../utils/error/errorHelper';
import userRoutes from './user/';
import celebrityRoutes from './celebrity/';
import movieRoutes from './movie/';

const initAllRoutes = (app: Application) => {
   app.use(ROUTE_CONSTANTS.API_ENDPOINT.USER, userRoutes);
   app.use(ROUTE_CONSTANTS.API_ENDPOINT.CELIBRITY, celebrityRoutes);
   app.use(ROUTE_CONSTANTS.API_ENDPOINT.MOVIE, movieRoutes);

   //404 handler and pass to error handler
   app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(ERROR_CONSTANTS.NOT_FOUND));
   });
};

export default initAllRoutes;
