export interface CreateCommentInput {
    postId: string;
    authorId: string;
    content: string;
}

export interface DeleteCommentInput {
    authorId: string;
    commentId: string;
}