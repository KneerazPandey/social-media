import z from 'zod';

export default class CommentValidation {
    public static createCommentSchema = z.object({
        content: z
            .string()
            .trim()
            .min(1, 'Comment cannot be empty')
            .max(1000, 'Comment cannot exceed 1000 characters'),
    });
}