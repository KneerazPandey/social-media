import type { Request, Response } from "express";
import ProfileService from "./profile.service.js";
import { ApiResponse } from "../../core/response/api-response.js";
import UploadError from "../../errors/upload-error.js";

export default class ProfileController {
    public static async addBio(req: Request, res: Response): Promise<Response> {
        const result = await ProfileService.addBio(req.user._id, req.body.bio);
        return res.status(200).json(new ApiResponse({
            message: "Bio added successfully",
            data: result,
        }));
    }

    public static async updateProfilePicture(req: Request, res: Response): Promise<Response> {
        const filePath = req.file?.path;

        if (!filePath) {
            throw new UploadError("No profile picture uploaded");
        }

        const result = await ProfileService.updateprofilePicture(req.user._id, filePath);

        return res.status(200).json(new ApiResponse({
            message: "Profile picture updated successfully",
            data: result,
        }));
    }

    public static async removeProfilePicture(req: Request, res: Response): Promise<Response> {
        const result = await ProfileService.removeProfilePicture(req.user._id);

        return res.status(200).json(new ApiResponse({
            message: "Profile picture removed successfully",
            data: result,
        }));
    }

    public static async getMyProfile(req: Request, res: Response): Promise<Response> {
        const result = await ProfileService.getProfile(req.user._id);
        return res.status(200).json(new ApiResponse({
            message: "My profile fetched successfully",
            data: result,
        }));
    }
}