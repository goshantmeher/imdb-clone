import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../jwt/jwtHelper';
import { createError } from '../../error/errorHelper';
import ERROR_CONSTANTS from '../../constants/error-constants';

class AuthMiddleware {
   async decodeToken(req: Request, res: Response, next: NextFunction) {
      try {
         const token = req.cookies.token;

         if (!token) {
            return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
         } else {
            const decoded = verifyToken(token);
            if (!decoded) {
               return next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
            } else {
               req.user = decoded;
            }
         }

         return next();
      } catch (error) {
         next(createError(ERROR_CONSTANTS.UNAUTHORIZED));
      }
   }
}

export default new AuthMiddleware();
