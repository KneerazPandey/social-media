import { Router } from 'express';
import HealthController from './health.controller.js';
import { upload } from '../../middleware/upload.middleware.js';

const healthRoutes = Router();

healthRoutes.get('/', HealthController.check);

healthRoutes.post(
    '/upload',
    upload.single('image'),
    HealthController.uploadCheck,
);

export default healthRoutes;