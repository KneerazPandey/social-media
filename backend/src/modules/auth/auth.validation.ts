import { z } from 'zod';


export default class AuthValidation {
    public static registerSchema = z.object({
        username: z.string()
            .trim()
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username must not exceed 30 characters')
            .regex(
                /^[a-zA-Z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores',
            ),

        email: z
            .string()
            .trim()
            .email('Invalid email address')
            .toLowerCase(),

        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must not exceed 100 characters'),

        bio: z
            .string()
            .trim()
            .max(500, 'Bio must not exceed 500 characters')
            .optional(),

    });
}