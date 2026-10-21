export interface CreatePostInput {
    content: string;
    image?: string
}

export interface DeletePostInput {
    postId?: string;
    userId?: string;
}

export interface UpdatePostInput {
    postId?: string;
    userId?: string;
    content: string;
}