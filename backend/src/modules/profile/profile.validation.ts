import z from "zod";

export default class ProfileValidation {
    public static updateBioSchema = z.object({
        bio: z
            .string()
            .trim()
            .max(500, 'Bio cannot exceed 500 characters'),
    });
}