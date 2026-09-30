import UnauthorizedError from "../../errors/unauthorize-error.js";
import { CloudinaryProvider } from "../../utils/cloudinary-provider.js";
import User from "../auth/auth.user.models.js";
import { Post, type IPost } from "./post.models.js";
import type { CreatePostInput } from "./post.types.js";


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