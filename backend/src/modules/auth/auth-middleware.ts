import type { NextFunction, Response, Request } from "express";
import UnauthorizedError from "../../errors/unauthorize-error.js";
import jwt from 'jsonwebtoken';
import Env from "../../config/env.js";
import User from "./auth.user.models.js";



interface AccessTokenPayload {
    userId: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization || req.cookies.accessToken;
        if (!authorization) {
            throw new UnauthorizedError('Authentication Required');
        }

        const [schema, token] = authorization.split(' ');
        if (schema != 'Bearer' && !token) {
            throw new UnauthorizedError('Invalid authorization header. Authentication Required');
        }

        const payload = jwt.verify(token!, Env.SECRET_KEY) as AccessTokenPayload;

        const user = User.findById(payload.userId);
        if (!user) {
            throw new UnauthorizedError('User no longer exists. Please login with your credentials');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}


export default authMiddleware;