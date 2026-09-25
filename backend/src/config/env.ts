import EnvError from "../errors/env-error.js";
import dotenv from 'dotenv';


dotenv.config();


class Env {
    public static DEBUG = process.env.DEBUG || 'development'

    public static PORT = process.env.PORT || 3000;

    public static DATABASE_URI = Env.fetchEnv('DATABASE_URI');

    public static SECRET_KEY = Env.fetchEnv('SECRET_KEY');

    public JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'


    private static fetchEnv(name: string): string {
        const value = process.env[name];

        if (!value) {
            throw new EnvError(`Environment variable ${name} is required`);
        }

        return value;
    }
}


export default Env;