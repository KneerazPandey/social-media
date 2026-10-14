import mongoose from "mongoose";
import UnauthorizedError from "../../errors/unauthorize-error.js";
import { CloudinaryProvider } from "../../utils/cloudinary-provider.js";
import User from "../auth/auth.user.models.js";
import { Post, type IPost } from "./post.models.js";
import type { CreatePostInput, DeletePostInput } from "./post.types.js";
import BadRequestError from "../../errors/bad-request-error.js";
import NotFoundError from "../../errors/not-found-error.js";
import Comment from "../comments/comment.models.js";


export default class PostService {
    public static async createPost(userId: string, data: CreatePostInput): Promise<IPost> {
        const user = await User.findById(userId);
        if (!user) {
            throw new UnauthorizedError('The user does not exist .');
        }
        let cloudinaryUploadResponse;
        if (data.image) {
            cloudinaryUploadResponse = await CloudinaryProvider.upload(data.image)
        }
        const post = await Post.create({
            author: user._id,
            content: data.content,
            ...(cloudinaryUploadResponse?.url && { image: cloudinaryUploadResponse.url })
        });
        return post;
    }

    public static async deletePost(data: DeletePostInput): Promise<void> {
        if (!mongoose.isValidObjectId(data.postId)) {
            throw new BadRequestError("Invalid post id");
        }
        if (!mongoose.isValidObjectId(data.userId)) {
            throw new BadRequestError("Invalid user id");
        }

        const post = await Post.findById(data.postId);
        if (!post) {
            throw new NotFoundError('Post not found. Please refresh your page and try again.');
        }

        if (post.author._id.toString() !== data.userId) {
            throw new UnauthorizedError("You are not allowed to delete this post");
        }

        await Comment.deleteMany({
            post: post._id
        });

        const postImage = post.image;

        await Post.deleteOne({
            _id: post._id
        });

        if (postImage) {
            CloudinaryProvider.delete(postImage);
        }

    }

    public static async getPosts() {

        const posts = await Post.aggregate([
            // 1. First getting the post author
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },

            // 2. Converting author array to an object
            {
                $unwind: '$author'
            },

            // Getting comments belonging to this post
            {
                $lookup: {
                    from: 'comments',
                    let: { postId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$post', '$$postId'],
                                },
                            }
                        },

                        {
                            $lookup: {
                                from: 'users',
                                localField: 'author',
                                foreignField: "_id",
                                as: 'author',
                            },
                        },

                        {
                            $unwind: '$author'
                        },

                        // Only returning fields that are necessary
                        {
                            $project: {
                                _id: 1,
                                content: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                author: {
                                    _id: 1,
                                    username: 1,
                                    profileImage: 1,
                                }
                            }
                        },

                        {
                            $sort: {
                                createdAt: 1
                            }
                        }
                    ],
                    as: 'comments',
                }

            },

            // Returning only the field needed by the api
            {
                $project: {
                    _id: 1,
                    content: 1,
                    image: 1,
                    createdAt: 1,
                    updatedAt: 1,

                    author: {
                        _id: 1,
                        username: 1,
                        profileImage: 1,
                    },

                    comments: 1,
                }
            },

            {
                $sort: {
                    createdAt: 1,
                }
            }
        ]);


        return posts;
    }
}