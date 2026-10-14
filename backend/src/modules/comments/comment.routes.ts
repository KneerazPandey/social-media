import { Router } from "express";
import authMiddleware from "../auth/auth-middleware.js";
import CommentController from "./comment.controller.js";

const commentRoutes = Router();

commentRoutes.delete(
    '/:commentId/delete',
    authMiddleware,
    CommentController.deleteComment,
);

export default commentRoutes;