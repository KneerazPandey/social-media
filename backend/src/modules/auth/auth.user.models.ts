import mongoose, { Document, Model, Schema } from "mongoose";
import JwtToken from "../../config/jwt-token.js";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;

    generateAccessToken(): Promise<string>;
    generateRefreshToken(): Promise<string>;
}



const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    profileImage: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: ""
    }
});

userSchema.methods.generateAccessToken = async function (this: IUser): Promise<string> {
    return await JwtToken.forUser(this);
}

userSchema.methods.generateRefreshToken = async function (this: IUser): Promise<string> {
    return await JwtToken.forUser(this);
}

const User: Model<IUser> = mongoose.model('User', userSchema);
export default User;
