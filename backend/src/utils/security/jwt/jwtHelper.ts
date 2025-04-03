import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '7d';
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || '';

export interface JwtPayload {
   id: string;
   email: string;
}

const getNewToken = (payload: JwtPayload): string => {
   return jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: TOKEN_EXPIRATION as StringValue });
};

const verifyToken = (token: string): JwtPayload | null => {
   try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
   } catch (error) {
      return null;
   }
};

export { getNewToken, verifyToken };
