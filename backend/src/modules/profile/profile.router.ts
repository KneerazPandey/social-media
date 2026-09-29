import { Router } from 'express';
import authMiddleware from '../auth/auth-middleware.js';
import validateWithZod from '../../middleware/zod-validation-middleware.js';
import ProfileValidation from './profile.validation.js';
import ProfileController from './profile.controller.js';


const profileRoute = Router();

profileRoute.post(
    '/add-bio',
    authMiddleware,
    validateWithZod(ProfileValidation.updateBioSchema),
    ProfileController.addBio,
);

export default profileRoute;