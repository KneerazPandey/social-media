import type { Request, Response } from "express";
import AuthService from "./auth.service.js";
import { ApiResponse } from "../../core/response/api-response.js";


export default class AuthController {
    public static async register(req: Request, res: Response): Promise<Response> {
        const result = await AuthService.register(req.body);
        return res.status(201).json(new ApiResponse({
            message: "User registered successfully",
            data: result,
        }));
    }

    public static async login(req: Request, res: Response): Promise<Response> {
        const result = await AuthService.login(req.body);
        return res.status(200).json(new ApiResponse({
            message: 'LoginSuccessfull',
            data: result,
        }));
    }
}