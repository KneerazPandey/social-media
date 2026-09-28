import type { Request, Response } from "express";
import AuthService from "./auth.service.js";
import { ApiResponse } from "../../core/response/api-response.js";
import type { RegisterInput } from "./auth.types.js";


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

        return res.status(200).json(new ApiResponse({
            message: 'Login Successfull',
            data: result,
        }));
    }
}