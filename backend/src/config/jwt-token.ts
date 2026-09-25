import type { IUser } from "../modules/auth/auth.user.models.js";
import Env from "./env.js";
import jwt, { type SignOptions } from 'jsonwebtoken';

interface AccessTokenPayload {
    userId: string;
}

export default class JwtToken {
    public static async forUser(user: IUser): Promise<string> {
        const payload: AccessTokenPayload = {
            userId: user._id.toString(),
        };

        const options: SignOptions = {
            expiresIn: Env.JWT_EXPIRES_IN,
        }

        return jwt.sign(
            payload,
            Env.SECRET_KEY,
            options
        );
    }
}