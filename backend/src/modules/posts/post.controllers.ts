import type { Request, Response } from "express";
import PostService from "./post.service.js";
import type { CreatePostInput, DeletePostInput, UpdatePostInput } from "./post.types.js";
import { ApiResponse } from "../../core/response/api-response.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";


export default class PostContoller {
    public static async createPost(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            throw new UnauthorizedError('Authentication Required');
        }

        const postData = {
            content: req.body.content,
            ...(req.file?.path && { image: req.file.path })
        } satisfies CreatePostInput;

        const post = await PostService.createPost(req.user._id.toString(), postData);
        return res.status(201).json(new ApiResponse({
            message: "Post created successfully",
            data: post
        }));

    }

    public static async deletePost(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            throw new UnauthorizedError("Authentication Required");
        }

        const deletePostData = {
            userId: req.user._id.toString(),
            postId: req.params.postId ? req.params.postId.toString() : ''
        } satisfies DeletePostInput;

        await PostService.deletePost(deletePostData);

        return res.status(200).json(new ApiResponse({
            message: "Post Deleted Successfully",
        }));
    }

    public static async getPosts(req: Request, res: Response): Promise<Response> {
        const posts = await PostService.getPosts();

        return res.status(200).json(new ApiResponse({
            message: "All post data fetched successfully",
            data: posts
        }));
    }

    public static async updatePostContent(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            throw new UnauthorizedError("Authentication Required");
        }

        const updateP0stInput = {
            content: req.body.content,
            postId: req.params.postId,
            userId: req.user._id.toString()
        } as UpdatePostInput;

        const post = await PostService.updatePostContent(updateP0stInput);

        return res.status(200).json(new ApiResponse({
            message: "Post content updated successfully",
            data: post,
        }));
    }
}