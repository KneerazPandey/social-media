import { Router } from 'express';
import AuthController from './auth.controller.js';
import { upload } from '../../middleware/upload.middleware.js';
import validateWithZod from '../../middleware/zod-validation-middleware.js';
import AuthValidation from './auth.validation.js';


const authRoutes = Router();

authRoutes.post(
    '/register',
    upload.single('profileImage'),
    validateWithZod(AuthValidation.registerSchema),
    AuthController.register,
);

authRoutes.post('/login', AuthController.login);

export default authRoutes;