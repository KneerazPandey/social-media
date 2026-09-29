import mongoose, { Document, Schema, type Model } from "mongoose";


export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    refreshTokenHash: string;
    expiresAt: Date;
    revokedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new Schema<ISession>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    refreshTokenHash: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },

    revokedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});


sessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 },
);

const Session: Model<ISession> = mongoose.model<ISession>(
    'Session',
    sessionSchema,
);

export default Session;