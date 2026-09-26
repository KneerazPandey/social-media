import type { Request, Response } from "express";
import { ApiResponse } from "../../core/response/api-response.js";


export default class HealthController {
    public static async check(req: Request, res: Response): Promise<Response> {
        return res.status(200).json(
            new ApiResponse({
                message: 'Server is healthy',
                data: {
                    status: 'ok',
                    timestamp: new Date().toISOString(),
                },
            }),
        );
    }

    public static async uploadCheck(req: Request, res: Response): Promise<Response> {
        if (!req.file) {
            throw new Error('Image is required');
        }

        return res.status(200).json(
            new ApiResponse({
                message: 'Multer upload is working',
                data: {
                    originalName: req.file.originalname,
                    filename: req.file.filename,
                    mimeType: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                },
            }),
        );
    }
}