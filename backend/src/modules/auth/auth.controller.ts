import type { Request, Response } from "express";
import AuthService from "./auth.service.js";
import { ApiResponse } from "../../core/response/api-response.js";
import type { RegisterInput } from "./auth.types.js";
import JwtToken from "../../config/jwt-token.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";


export default class AuthController {
    public static async register(req: Request, res: Response): Promise<Response> {
        const input: RegisterInput = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            ...(req.file && {
                profileImage: req.file.path,
            }),
        };
        const result = await AuthService.register(input);

        return res.status(201).json(new ApiResponse({
            message: "User registered successfully",
            data: result,
        }));
    }

    public static async login(req: Request, res: Response): Promise<Response> {
        const result = await AuthService.login({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(200)
            .cookie('accessToken', result.accessToken)
            .cookie('refreshToken', result.refreshToken)
            .json(new ApiResponse({
                message: 'Login Successfull',
                data: result,
            }));
    }

    public static async logout(req: Request, res: Response): Promise<Response> {
        await AuthService.logout(req.body.refreshToken);
        return res.status(200)
            .clearCookie('refreshToken')
            .clearCookie('accessToken')
            .json(new ApiResponse({
                message: 'You have been successfully logout.',
            }));
    }

    public static async refresh(req: Request, res: Response): Promise<Response> {
        const result = await JwtToken.refresh(req.body.refreshToken);
        return res.status(200)
            .cookie('accessToken', result.accessToken)
            .cookie('refreshToken', result.refreshToken)
            .json(new ApiResponse({
                message: "New access and refresh token has been successfully generated",
                data: result,
            }));
    }

    public static async getCurrentUser(req: Request, res: Response): Promise<Response> {
        const result = await AuthService.getCurrentuser(req.user);
        return res.status(200).json({
            message: 'The user details',
            data: result,
        });
    }


    public static async changeCurrentPassword(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            throw new UnauthorizedError('Authentication required');
        }

        const { currentPassword, newPassword } = req.body;

        await AuthService.changeCurrentPassword(
            req.user._id.toString(),
            currentPassword,
            newPassword,
        );

        return res.status(200).json(
            new ApiResponse({
                message: 'Password changed successfully',
            }),
        );
    }
}