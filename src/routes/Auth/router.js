import { Router } from 'express';

import AuthController from '../../controller/Auth';
const router = Router();

router.post('/register', AuthController.Register);

router.post('/login', AuthController.Login);

export default router;
