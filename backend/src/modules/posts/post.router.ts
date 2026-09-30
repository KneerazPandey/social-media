import { Router } from "express";
import authMiddleware from "../auth/auth-middleware.js";
import validateWithZod from "../../middleware/zod-validation-middleware.js";
import PostValidation from "./post.validation.js";
import { upload } from "../../middleware/upload.middleware.js";
import PostContoller from "./post.controllers.js";
import CommentValidation from "../comments/comment.validation.js";
import CommentController from "../comments/comment.controller.js";

const postRoutes = Router();

postRoutes.post(
    '/',
    upload.single('image'),
    authMiddleware,
    validateWithZod(PostValidation.createPostValidation),
    PostContoller.createPost,
);

postRoutes.post(
    '/:postId/comments/',
    authMiddleware,
    validateWithZod(CommentValidation.createCommentSchema),
    CommentController.createComment,
)

postRoutes.get('/', authMiddleware, PostContoller.getPosts);

export default postRoutes;