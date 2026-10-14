import mongoose from "mongoose";
import type { FollowUserInput, UnfollowUserInput } from "./follow.types.js";
import BadRequestError from "../../errors/bad-request-error.js";
import User from "../auth/auth.user.models.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";
import NotFoundError from "../../errors/not-found-error.js";
import Follow from "./follow.model.js";
import ConflictError from "../../errors/conflict-error.js";


export default class FollowService {
    public static async followUser(data: FollowUserInput) {
        if (!mongoose.isValidObjectId(data.currentUserId)) {
            throw new BadRequestError("Invalid Operation. Please try again.");
        }
        if (!mongoose.isValidObjectId(data.userToBeFollowedId)) {
            throw new BadRequestError("The user you are trying to follow does not exists.");
        }

        const currentUser = await User.findById(data.currentUserId);
        if (!currentUser) {
            throw new UnauthorizedError("You are not authenticated. Please login first to follow user.");
        }
        const userToBeFollowed = await User.findById(data.userToBeFollowedId);
        if (!userToBeFollowed) {
            throw new NotFoundError("The user you are trying to follow does not exists.");
        }

        if (currentUser._id == userToBeFollowed._id) {
            throw new BadRequestError("You cannot follow yourself.");
        }

        const existingFollow = await Follow.exists({
            follower: currentUser._id,
            following: userToBeFollowed._id
        })
        if (existingFollow) {
            throw new ConflictError("You are already following this user.")
        }

        await Follow.create({
            follower: currentUser._id,
            following: userToBeFollowed._id
        });

        await User.updateOne(
            {
                _id: currentUser._id
            },
            {
                $inc: {
                    followingCount: 1
                }
            }
        );

        // Updating the user followers count
        await User.updateOne(
            {
                _id: userToBeFollowed._id
            }, {
            $inc: {
                followersCount: 1,
            }
        }
        );
    }

    public static async unfollowUser(data: UnfollowUserInput) {
        if (!mongoose.isValidObjectId(data.currentUserId)) {
            throw new BadRequestError("Invalid Operation. Please try again.");
        }
        if (!mongoose.isValidObjectId(data.userToBeUnfollowedId)) {
            throw new BadRequestError("The user you are trying to unfollow does not exists.");
        }

        const currentUser = await User.findById(data.currentUserId);
        if (!currentUser) {
            throw new UnauthorizedError("You are not authenticated. Please login first to unfollow user.");
        }
        const userToBeUnfollowed = await User.findById(data.userToBeUnfollowedId);
        if (!userToBeUnfollowed) {
            throw new NotFoundError("The user you are trying to unfollow does not exists.");
        }

        if (currentUser._id == userToBeUnfollowed._id) {
            throw new BadRequestError("You cannot unfollow yourself.");
        }

        const isCurrentlyFollowing = await Follow.exists({
            follower: currentUser._id,
            following: userToBeUnfollowed._id
        })
        if (!isCurrentlyFollowing) {
            throw new ConflictError("You are currently not following this user to be unfollowed");
        }

        await Follow.deleteOne({
            follower: currentUser._id,
            following: userToBeUnfollowed._id
        });

        await User.updateOne(
            {
                _id: currentUser.id,
            },
            {
                $inc: {
                    followingCount: -1
                }
            }
        );

        await User.updateOne(
            {
                _id: userToBeUnfollowed._id,
            },
            {
                $inc: {
                    followersCount: -1
                }
            }
        );
    }
}