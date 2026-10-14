export interface FollowUserInput {
    currentUserId: string;
    userToBeFollowedId: string;
}

export interface UnfollowUserInput {
    currentUserId: string;
    userToBeUnfollowedId: string;
}