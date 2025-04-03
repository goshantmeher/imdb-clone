import { Request, Response } from 'express';
import Celebrity, { ICelebrity } from '../../models/celebrity/celebrityModel';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { getMessage } from '../../utils/constants/message-constants';
import { IActionResponse } from '../types';

export const getCelebrityAction = async (id: string): Promise<IActionResponse<ICelebrity>> => {
   try {
      const celebrity = await Celebrity.findById(id);
      if (!celebrity) {
         return {
            ...ERROR_CONSTANTS.NOT_FOUND,
            message: getMessage('NOT_FOUND'),
         };
      }
      const celebrityResult = celebrity.toObject ? celebrity.toObject() : JSON.parse(JSON.stringify(celebrity));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('CELEBRITY_FETCH_SUCCESS'),
         data: celebrityResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const filterGetCelebrityAction = async (req: Request, res: Response) => {
   try {
      const { role, name, page = 1, limit = 10 } = req.query;

      const query: any = {};
      if (role) {
         const roleList = (role as string).split(',');
         query.roles = { $all: roleList };
      }
      if (name) query.name = new RegExp(name as string, 'i');

      console.log('query', query);

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const result = await Celebrity.find(query, '_id name roles avatar')
         .skip((pageNumber - 1) * limitNumber)
         .limit(limitNumber)
         .exec();

      const totalCount = await Celebrity.countDocuments(query);

      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('CELEBRITY_FETCH_SUCCESS'),
         data: {
            results: JSON.parse(JSON.stringify(result)),
            pagination: {
               total: totalCount,
               page: pageNumber,
               limit: limitNumber,
               totalPages: Math.ceil(totalCount / limitNumber),
            },
         },
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const createCelebrityAction = async (req: Request, res: Response): Promise<IActionResponse<ICelebrity>> => {
   try {
      const body = req.body;
      const { name, bio, roles, dob, createdBy, avatar, images }: Partial<ICelebrity> = body;

      const newCelebrity = new Celebrity({
         name,
         bio,
         roles,
         dob,
         createdBy,
         avatar,
         images: images || [],
      });

      const saveResult = await newCelebrity.save();
      if (!saveResult) {
         return {
            ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
            message: getMessage('CELEBRITY_ADD_FAILURE'),
         };
      }
      const celebrityResult = saveResult.toObject ? saveResult.toObject() : JSON.parse(JSON.stringify(saveResult));
      return {
         ...ERROR_CONSTANTS.CREATED,
         message: getMessage('CELEBRITY_ADD_SUCCESS'),
         data: celebrityResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const updateCelebrityAction = async (req: Request, res: Response): Promise<IActionResponse<ICelebrity>> => {
   try {
      const body: Partial<ICelebrity> = req.body;
      const id = req.params.ID;

      const updateResult = await Celebrity.findOneAndUpdate(
         {
            _id: id,
         },
         body,
         {
            new: true,
         },
      );
      if (!updateResult) {
         return {
            ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
            message: getMessage('CELEBRITY_UPDATE_FAILURE'),
         };
      }
      const celebrityResult = updateResult.toObject ? updateResult.toObject() : JSON.parse(JSON.stringify(updateResult));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('CELEBRITY_UPDATE_SUCCESS'),
         data: celebrityResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};
