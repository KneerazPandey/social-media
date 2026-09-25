import Hasher from "../config/hashers.js";

export default class PasswordManager {
    public static async hashPassword(password: string): Promise<string> {
        return await Hasher.hash(password);
    }

    public static async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await Hasher.compare(password, hashPassword);
    }
}