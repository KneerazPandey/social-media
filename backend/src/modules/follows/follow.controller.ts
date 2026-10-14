import type { Request, Response } from "express";
import type { FollowUserInput, UnfollowUserInput } from "./follow.types.js";
import FollowService from "./follow.service.js";
import { ApiResponse } from "../../core/response/api-response.js";


export default class FollowController {
    public static async followUser(req: Request, res: Response): Promise<Response> {
        const followInput = {
            currentUserId: req.user._id,
            userToBeFollowedId: req.params.userToBeFollowedId?.toString() ?? ''
        } satisfies FollowUserInput;

        await FollowService.followUser(followInput);

        return res.status(200).json(new ApiResponse({
            message: "You have successfully followed the user"
        }));
    }

    public static async unfollowUser(req: Request, res: Response): Promise<Response> {
        const unfollowInput = {
            currentUserId: req.user._id,
            userToBeUnfollowedId: req.params.userToBeUnfollowedId?.toString() ?? ''
        } satisfies UnfollowUserInput;

        await FollowService.unfollowUser(unfollowInput);

        return res.status(200).json(new ApiResponse({
            message: "You have successfully unfollowed the user"
        }));
    }
}