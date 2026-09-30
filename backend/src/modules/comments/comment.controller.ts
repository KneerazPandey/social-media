import type { Request, Response } from "express";
import type { CreateCommentInput } from "./comment.types.js";
import CommentService from "./comment.service.js";
import { ApiResponse } from "../../core/response/api-response.js";


export default class CommentController {

    public static async createComment(req: Request, res: Response): Promise<Response> {
        const input = {
            authorId: req.user._id,
            content: req.body.content,
            postId: (req.params && req.params.postId) != undefined ? req.params.postId?.toString()! : ''
        } satisfies CreateCommentInput;

        const result = await CommentService.createComment(input);

        return res.status(201).json(
            new ApiResponse({
                message: 'Comment created successfully',
                data: result,
            }),
        );
    }

}