import { validateLogin, validateRegister } from '../../controllers/user/validator';
import Controller from '../../controllers/user/controller';
import { Router } from 'express';
import ROUTE_CONSTANTS from '../../utils/constants/route-constants';
import { validateRequestBody } from '../../utils/security/validator/requestValidator';
const router = Router();

router.post(ROUTE_CONSTANTS.API_ENDPOINT.LOGIN, validateRequestBody, validateLogin, Controller.login);
router.post('/', validateRequestBody, validateRegister, Controller.post);
export default router;
