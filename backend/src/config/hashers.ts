import Constant from "../core/constant/constant.js";
import bcrypt from 'bcrypt';


export default class Hasher {
    public static async hash(value: string, hashSalt: number = Constant.hashSalt): Promise<string> {
        return await bcrypt.hash(value, hashSalt);
    }

    public static async compare(value: string, hashValue: string): Promise<boolean> {
        return bcrypt.compare(value, hashValue);
    }
}