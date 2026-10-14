import mongoose, { Document, Model, Schema } from "mongoose";


export interface IFollow extends Document {
    follower: mongoose.Types.ObjectId;
    following: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const followSchema = new Schema<IFollow>({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },

    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {
    timestamps: true,
});

// Preventing duplicate follows
followSchema.index(
    { follower: 1, following: 1 },
    { unique: true }
);

const Follow: Model<IFollow> = mongoose.model<IFollow>("Follow", followSchema);

export default Follow;