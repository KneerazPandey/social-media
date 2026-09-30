import type { Request, Response } from "express";
import PostService from "./post.service.js";
import type { CreatePostInput } from "./post.types.js";
import { ApiResponse } from "../../core/response/api-response.js";


export default class PostContoller {
    public static async createPost(req: Request, res: Response): Promise<Response> {
        const postData = {
            content: req.body.content,
            ...(req.file?.path && { image: req.file.path })
        } satisfies CreatePostInput;

        const post = await PostService.createPost(req.user._id as string, postData);
        return res.status(201).json(new ApiResponse({
            message: "Post created successfully",
            data: post
        }));

    }

    public static async getPosts(req: Request, res: Response): Promise<Response> {
        const posts = await PostService.getPosts();

        return res.status(200).json(new ApiResponse({
            message: "All post data fetched successfully",
            data: posts
        }));
    }
}