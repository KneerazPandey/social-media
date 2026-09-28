
import type { NextFunction, Request, Response } from "express";
import { ApiErrorResponse } from "../core/response/api-error-response.js";
import ApiError from "../errors/api-error.js";

export const errorMiddleware = (error: any, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
        res.status(error.statusCode).json(
            new ApiErrorResponse({
                message: error.message,
                statusCode: error.statusCode,
                errors: error.errors,
            })
        );

        return;
    }

    res.status(500).json(
        new ApiErrorResponse({
            message: 'Internal server error',
            statusCode: 500,
        })
    );
};