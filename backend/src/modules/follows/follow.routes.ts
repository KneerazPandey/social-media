import { Router } from "express";
import authMiddleware from "../auth/auth-middleware.js";
import FollowController from "./follow.controller.js";

const followRouter = Router();


followRouter.post(
    '/:userToBeFollowedId/follow',
    authMiddleware,
    FollowController.followUser,
);

followRouter.post(
    '/:userToBeUnfollowedId/unfollow',
    authMiddleware,
    FollowController.unfollowUser,
);


export default followRouter;