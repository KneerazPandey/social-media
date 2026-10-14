import mongoose, { Document, Model, Schema } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;

    followersCount: number;
    followingCount: number;
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
    },
    followersCount: {
        type: Number,
        default: 0,
        min: 0
    },
    followingCount: {
        type: Number,
        default: 0,
        min: 0,
    }
});


const User: Model<IUser> = mongoose.model('User', userSchema);
export default User;
