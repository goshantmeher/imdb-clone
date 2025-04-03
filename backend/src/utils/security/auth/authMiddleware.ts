import { Response, NextFunction, Request } from 'express';

class AuthMiddleware {
   async decodeToken(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         next();
      } catch (error) {
         next();
      }
   }
}

export default new AuthMiddleware();
