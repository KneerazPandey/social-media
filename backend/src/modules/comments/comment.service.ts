import type { CreateCommentInput } from "./comment.types.js";
import Comment, { type IComment } from "./comment.models.js";
import { Post } from "../posts/post.models.js";
import BadRequestError from "../../errors/bad-request-error.js";
import User from "../auth/auth.user.models.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";

export default class CommentService {
    public static async createComment(input: CreateCommentInput): Promise<IComment> {
        const user = await User.findById(input.authorId);
        if (!user) {
            throw new UnauthorizedError('Please login first before comment');
        }

        const post = await Post.findById(input.postId);
        if (!post) {
            throw new BadRequestError("Post not found");
        }

        const commnet = await Comment.create({
            post: post._id,
            author: user._id,
            content: input.content,
        });
        return commnet;
    }
}