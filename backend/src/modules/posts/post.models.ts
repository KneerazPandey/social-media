import mongoose, { Document, Schema } from "mongoose";


export interface IPost extends Document {
    author: mongoose.Schema.Types.ObjectId;
    content: string;
    image: string;
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
        required: true
    }
}, { timestamps: true });


export const PostModel = mongoose.model<IPost>("Post", postSchema);