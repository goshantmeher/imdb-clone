import Controller from '../../controllers/movie/controller';
import { Router } from 'express';
import { validateIdParam, validateRequestBody } from '../../utils/security/validator/requestValidator';
import {
   validateAddMovie,
   validateUpdateMovie,
   validateAddActorFromMovie,
   validateRemoveActorFromMovie,
} from '../../controllers/movie/validator';
import authMiddleware from '../../utils/security/auth/authMiddleware';
const router = Router();

router.get('/:ID', validateIdParam, Controller.get);

router.get('/', Controller.getByFilter);

router.post('/', authMiddleware.decodeToken, validateRequestBody, validateAddMovie, Controller.post);

router.patch(
   '/:ID/add-actor',
   validateIdParam,
   authMiddleware.decodeToken,
   validateRequestBody,
   validateAddActorFromMovie,
   Controller.addActorToMovie,
);

router.patch(
   '/:ID/remove-actor',
   validateIdParam,
   authMiddleware.decodeToken,
   validateRequestBody,
   validateRemoveActorFromMovie,
   Controller.removeActorToMovie,
);

router.patch('/:ID', validateIdParam, authMiddleware.decodeToken, validateRequestBody, validateUpdateMovie, Controller.patch);

export default router;
