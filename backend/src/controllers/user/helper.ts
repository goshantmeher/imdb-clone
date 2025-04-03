import { Request, Response } from 'express';
import User, { IUser } from '../../models/user/userModel';
import { getNewToken } from '../../utils/security/jwt/jwtHelper';
import { getMessage } from '../../utils/constants/message-constants';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { IActionResponse } from '../types';

export const loginAction = async (req: Request, res: Response): Promise<IActionResponse<IUser>> => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         return {
            code: 403,
            message: getMessage('USER_NOT_EXIST_PLEASE_REGISTER'),
         };
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
         const newJwt = getNewToken({
            email: user.email,
            id: `${user._id}`,
         });
         if (newJwt) {
            res.cookie('token', newJwt, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const userResult = user.toObject ? user.toObject() : JSON.parse(JSON.stringify(user));
            delete userResult.password;
            return {
               ...ERROR_CONSTANTS.OK,
               message: getMessage('USER_LOGIN_SUCCESS'),
               data: userResult,
            };
         }
      }
      return ERROR_CONSTANTS.UNAUTHORIZED;
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const createUserAction = async (req: Request, res: Response): Promise<IActionResponse<IUser>> => {
   try {
      const body = req.body;
      const { name, email, password }: Partial<IUser> = body;

      const newUser = new User({
         name,
         email,
         password,
      });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return {
            ...ERROR_CONSTANTS.DATA_EXIST,
            message: getMessage('USER_EXIST'),
         };
      }

      const saveResult = await newUser.save();
      if (!saveResult) {
         return {
            ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
            message: getMessage('USER_REGISTER_FAILED'),
         };
      }
      const userResult = saveResult.toObject ? saveResult.toObject() : JSON.parse(JSON.stringify(saveResult));
      delete userResult.password;
      return {
         ...ERROR_CONSTANTS.CREATED,
         message: getMessage('USER_REGISTER_SUCCESS'),
         data: userResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};
