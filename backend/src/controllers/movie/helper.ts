import { Request, Response } from 'express';
import ERROR_CONSTANTS from '../../utils/constants/error-constants';
import { getMessage } from '../../utils/constants/message-constants';
import { IActionResponse } from '../types';
import Movie, { IMovie } from '../../models/movies/moviesModel';

export const getMovieAction = async (id: string): Promise<IActionResponse<IMovie>> => {
   try {
      const movie = await Movie.findById(id);
      if (!movie) {
         return {
            ...ERROR_CONSTANTS.NOT_FOUND,
            message: getMessage('NOT_FOUND'),
         };
      }
      const movieResult = movie.toObject ? movie.toObject() : JSON.parse(JSON.stringify(movie));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('MOVIE_FETCHED_SUCCESSFULLY'),
         data: movieResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const filterGetMovieAction = async (req: Request, res: Response) => {
   try {
      const { name, year_of_release, producer_id, actor_id, page = 1, limit = 10 } = req.query;

      const query: any = {};
      if (actor_id) query.actor_ids = actor_id;
      if (name) query.name = new RegExp(name as string, 'i');
      if (producer_id) query.producer_id = producer_id;
      if (year_of_release) {
         const yearList = (year_of_release as string).split(',');
         query.year_of_release = { $all: yearList };
      }

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const result = await Movie.find(query, '_id name avatar year_of_release')
         .skip((pageNumber - 1) * limitNumber)
         .limit(limitNumber)
         .exec();

      const totalCount = await Movie.countDocuments(query);

      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('MOVIE_FETCHED_SUCCESSFULLY'),
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

export const createMovieAction = async (req: Request, res: Response): Promise<IActionResponse<IMovie>> => {
   try {
      const body = req.body;
      const { name, actor_ids, plot, producer_id, year_of_release, createdBy, avatar, images }: Partial<IMovie> = body;

      const newMovie = new Movie({
         name,
         actor_ids,
         plot,
         producer_id,
         year_of_release,

         createdBy,
         avatar,
         images: images || [],
      });

      const saveResult = await newMovie.save();
      if (!saveResult) {
         return {
            ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
            message: getMessage('MOVIE_ADDED_FAILED'),
         };
      }
      const movieResult = saveResult.toObject ? saveResult.toObject() : JSON.parse(JSON.stringify(saveResult));
      return {
         ...ERROR_CONSTANTS.CREATED,
         message: getMessage('MOVIE_ADDED_SUCCESSFULLY'),
         data: movieResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const updateMovieAction = async (req: Request, res: Response): Promise<IActionResponse<IMovie>> => {
   try {
      const body: Partial<IMovie> = req.body;
      const id = req.params.ID;

      const updateResult = await Movie.findOneAndUpdate(
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
            message: getMessage('MOVIE_UPDATE_FAILED'),
         };
      }
      const movieResult = updateResult.toObject ? updateResult.toObject() : JSON.parse(JSON.stringify(updateResult));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('MOVIE_UPDATED_SUCCESSFULLY'),
         data: movieResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const addActorToMovieAction = async (movieId: string, newActorId: string): Promise<IActionResponse<IMovie>> => {
   try {
      const updateResult = await Movie.findByIdAndUpdate(movieId, { $addToSet: { actor_ids: newActorId } }, { new: true });

      if (!updateResult) {
         return {
            ...ERROR_CONSTANTS.INTERNAL_SERVER_ERROR,
            message: getMessage('MOVIE_UPDATE_FAILED'),
         };
      }
      const movieResult = updateResult.toObject ? updateResult.toObject() : JSON.parse(JSON.stringify(updateResult));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('MOVIE_UPDATED_SUCCESSFULLY'),
         data: movieResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};

export const removeActorFromMovieAction = async (movieId: string, actor_id: string): Promise<IActionResponse<IMovie>> => {
   try {
      const updateResult = await Movie.findByIdAndUpdate(movieId, { $pull: { actor_ids: actor_id } }, { new: true });

      if (!updateResult) {
         return {
            ...ERROR_CONSTANTS.NOT_FOUND,
            message: getMessage('MOVIE_UPDATE_FAILED'),
         };
      }

      const movieResult = updateResult.toObject ? updateResult.toObject() : JSON.parse(JSON.stringify(updateResult));
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('MOVIE_UPDATED_SUCCESSFULLY'),
         data: movieResult,
      };
   } catch (error) {
      return ERROR_CONSTANTS.INTERNAL_SERVER_ERROR;
   }
};
