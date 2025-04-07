import Controller from '../../controllers/celebrity/controller';
import { Router } from 'express';
import { validateIdParam, validateRequestBody } from '../../utils/security/validator/requestValidator';
import { validateAddCelebrity, validateUpdateCelebrity, validateAddRemoveRoleToCelebrity } from '../../controllers/celebrity/validator';
import authMiddleware from '../../utils/security/auth/authMiddleware';
const router = Router();

router.get('/:ID', validateIdParam, Controller.get);

router.get('/', Controller.getByFilter);

router.post('/', authMiddleware.decodeToken, validateRequestBody, validateAddCelebrity, Controller.post);

router.patch(
   '/:ID/add-role',
   validateIdParam,
   authMiddleware.decodeToken,
   validateRequestBody,
   validateAddRemoveRoleToCelebrity,
   Controller.addRoleToCelebrity,
);

router.patch(
   '/:ID/remove-role',
   validateIdParam,
   authMiddleware.decodeToken,
   validateRequestBody,
   validateAddRemoveRoleToCelebrity,
   Controller.removeRoleToCelebrity,
);

router.patch('/:ID', validateIdParam, authMiddleware.decodeToken, validateRequestBody, validateUpdateCelebrity, Controller.patch);

export default router;
