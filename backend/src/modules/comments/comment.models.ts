import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    author: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    content: string;
}

const commentSchema = new Schema<IComment>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;