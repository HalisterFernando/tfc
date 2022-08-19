import { Router } from 'express';

import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = Router();

router.post('/', loginController.login);
router.get('/validate', loginController.validate);

export default router;
