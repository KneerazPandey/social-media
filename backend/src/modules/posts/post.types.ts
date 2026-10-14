export interface CreatePostInput {
    content: string;
    image?: string
}

export interface DeletePostInput {
    postId?: string;
    userId?: string;
}