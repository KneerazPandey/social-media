import UnauthorizedError from "../errors/unauthorize-error.js";
import Env from "./env.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { hashToken } from "../utils/hash-token.js";
import Session from "../modules/auth/auth.sessions.models.js";
import User from "../modules/auth/auth.user.models.js";

export interface AccessTokenPayload {
    userId: string;
    sessionId: string;
    type: 'access'
}

export interface RefreshTokenPayload {
    userId: string;
    sessionId: string;
    type: 'refresh';
}

export default class JwtToken {
    public static async generateAccessToken(userId: string, sessionId: string): Promise<string> {
        return jwt.sign(
            {
                userId,
                sessionId,
                type: 'access'
            } satisfies AccessTokenPayload,
            Env.SECRET_KEY,
            {
                expiresIn: Env.JWT_EXPIRES_IN,
                jwtid: crypto.randomUUID(),
            }
        );
    }

    public static async generateRefreshToken(userId: string, sessionId: string): Promise<string> {
        return jwt.sign(
            {
                userId,
                sessionId,
                type: 'refresh'
            } satisfies RefreshTokenPayload,
            Env.SECRET_KEY,
            {
                expiresIn: 5009009,
                jwtid: crypto.randomUUID(),
            }
        );
    }

    public static async refresh(refreshToken: string) {
        let payload: RefreshTokenPayload;

        // Verifying refresh token
        try {
            payload = jwt.verify(refreshToken, Env.SECRET_KEY) as RefreshTokenPayload;
        } catch (error) {
            throw new UnauthorizedError(
                'Invalid or expired refresh token',
            );
        }

        // Making sure this is refresh token
        if (payload.type !== 'refresh') {
            throw new UnauthorizedError('Invlaid refresh token');
        }

        // Validating the IDs before querying MongoDB.
        if (!mongoose.isValidObjectId(payload.userId) || !mongoose.isValidObjectId(payload.sessionId)) {
            throw new UnauthorizedError("Invalid refresh token");
        }

        // Hashing the raw refresh token
        const refreshTokenHash = hashToken(refreshToken);

        // Finding the actual session in mongoose
        const session = await Session.findOne({
            _id: payload.sessionId,
            userId: payload.userId,
            refreshTokenHash,
            revokedAt: null,
        });

        if (!session) {
            throw new UnauthorizedError(
                'Invalid or revoked refresh token',
            );
        }

        // Finding the user
        const user = await User.findById(payload.userId);

        if (!user) {
            throw new UnauthorizedError(
                'User no longer exists',
            );
        }

        // Revoking the old sessions
        session.revokedAt = new Date();
        await session.save();

        // Creating new session in the mongoose
        const newSessionId = new mongoose.Types.ObjectId();
        // Generating new access and refresh token
        const newAccessToken =
            await JwtToken.generateAccessToken(
                user._id.toString(),
                newSessionId.toString(),
            );

        const newRefreshToken =
            await JwtToken.generateRefreshToken(
                user._id.toString(),
                newSessionId.toString(),
            );

        // Storing the new session  and refresh token hash in database
        await Session.create({
            _id: newSessionId,
            userId: user._id,
            refreshTokenHash: hashToken(newRefreshToken),
            expiresAt: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000,
            ),
        });

        return {
            user: user,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
}