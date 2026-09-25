import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Env from './config/env.js';

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

export default app;