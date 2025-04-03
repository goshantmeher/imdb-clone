import { JwtPayload } from '../../security/jwt/jwtHelper';

export {};

declare global {
   namespace Express {
      export interface Request {
         user?: JwtPayload;
         isAuthorized: boolean;
      }
   }
}
