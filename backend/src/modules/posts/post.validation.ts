import z from "zod";

export default class PostValidation {
    public static createPostValidation = z.object({
        content: z.string().min(1, "Content must be at least 1 character"),
        image: z.string().optional(),
    })
}