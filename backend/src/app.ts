import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Env from './config/env.js';
import healthRoutes from './modules/health/health.router.js';
import authRoutes from './modules/auth/auth-router.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import profileRoute from './modules/profile/profile.router.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: Env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(cookieParser());


app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoute);

app.use(errorMiddleware);

export default app;