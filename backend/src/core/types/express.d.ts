import type { IUser } from '../modules/auth/auth.user.models.js';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export { };