export interface RegisterInput {
    username: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}