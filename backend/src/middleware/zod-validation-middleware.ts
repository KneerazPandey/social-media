import fs from 'node:fs';
import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import ApiError from "../errors/api-error.js";


const validateWithZod = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            if (req.file?.path) {
                console.log(req.file.path);
                fs.unlinkSync(req.file.path);
            }
            next(new ApiError(400, result.error.message, result.error.flatten().fieldErrors));
            return;
        }

        req.body = result.data;
        next();
    }
}

export default validateWithZod;