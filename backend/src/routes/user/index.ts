import { validateLogin, validateRegister } from '../../controllers/user/validator';
import Controller from '../../controllers/user/controller';
import { Router } from 'express';
import ROUTE_CONSTANTS from '../../utils/constants/route-constants';
import { validateRequestBody } from '../../utils/security/validator/requestValidator';
import authMiddleware from '../../utils/security/auth/authMiddleware';
const router = Router();

router.get('/', authMiddleware.decodeToken, Controller.getLoggedInUser);
router.post(ROUTE_CONSTANTS.API_ENDPOINT.LOGIN, validateRequestBody, validateLogin, Controller.login);
router.post(ROUTE_CONSTANTS.API_ENDPOINT.LOGOUT, authMiddleware.decodeToken, Controller.logout);
router.post('/', validateRequestBody, validateRegister, Controller.post);
export default router;
