import EnvError from "../errors/env-error.js";
import dotenv from 'dotenv';


dotenv.config();


class Env {
    public static DEBUG =
        process.env.DEBUG || 'development'

    public static PORT: number =
        parseInt(process.env.PORT || '3000');

    public static DATABASE_URI: string =
        Env.fetchEnv('DATABASE_URI');

    public static SECRET_KEY: string =
        Env.fetchEnv('SECRET_KEY');

    public static JWT_EXPIRES_IN: number =
        parseInt(process.env.JWT_EXPIRES_IN || '1500');

    public static CORS_ORIGIN: string =
        Env.fetchEnv('CORS_ORIGIN');

    public static JWT_REFRESH_EXPIRES_IN: number =
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '30000');

    public static CLOUDINARY_CLOUD_NAME =
        Env.fetchEnv('CLOUDINARY_CLOUD_NAME');

    public static CLOUDINARY_API_KEY =
        Env.fetchEnv('CLOUDINARY_API_KEY');

    public static CLOUDINARY_API_SECRET =
        Env.fetchEnv('CLOUDINARY_API_SECRET');

    private static fetchEnv(name: string): string {
        const value = process.env[name];

        if (!value) {
            throw new EnvError(`Environment variable ${name} is required`);
        }

        return value;
    }
}


export default Env;