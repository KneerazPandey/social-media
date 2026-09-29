import { Router } from 'express';
import AuthController from './auth.controller.js';
import { upload } from '../../middleware/upload.middleware.js';
import validateWithZod from '../../middleware/zod-validation-middleware.js';
import AuthValidation from './auth.validation.js';
import authMiddleware from './auth-middleware.js';


const authRoutes = Router();

authRoutes.post(
    '/register',
    upload.single('profileImage'),
    validateWithZod(AuthValidation.registerSchema),
    AuthController.register,
);

authRoutes.post('/login', AuthController.login);

authRoutes.post('/logout', AuthController.logout);

authRoutes.post('/refresh', AuthController.refresh);

authRoutes.get('/profile', authMiddleware, AuthController.getCurrentUser);

authRoutes.post(
    '/change-password',
    authMiddleware,
    validateWithZod(AuthValidation.changeCurrentPasswordSchema),
    AuthController.changeCurrentPassword
);

export default authRoutes;