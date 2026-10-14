import type { CreateCommentInput, DeleteCommentInput } from "./comment.types.js";
import Comment, { type IComment } from "./comment.models.js";
import { Post } from "../posts/post.models.js";
import BadRequestError from "../../errors/bad-request-error.js";
import User from "../auth/auth.user.models.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";
import NotFoundError from "../../errors/not-found-error.js";

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

    public static async deleteComment(input: DeleteCommentInput): Promise<void> {
        const user = await User.findById(input.authorId);
        if (!user) {
            throw new UnauthorizedError('You are not authenticated to delete any comment. Please login first.');
        }

        const comment = await Comment.findById(input.commentId);
        if (!comment) {
            throw new NotFoundError("The comment does not exists to be delete. Please refresh your page and try again.");
        }

        if (comment.author._id !== user._id) {
            throw new UnauthorizedError("You are not the owner of comment to delete it.");
        }

        await Comment.deleteOne({
            _id: input.commentId
        })

    }
}