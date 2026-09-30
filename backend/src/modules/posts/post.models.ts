import mongoose, { Document, Schema } from "mongoose";


export interface IPost extends Document {
    author: mongoose.Types.ObjectId;
    content: string;
    image?: string;
}


const postSchema = new Schema<IPost>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });


export const Post = mongoose.model<IPost>("Post", postSchema);