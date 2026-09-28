import JwtToken from "../../config/jwt-token.js";
import ConflictError from "../../errors/conflict-error.js";
import UnauthorizedError from "../../errors/unauthorize-error.js";
import PasswordManager from "../../managers/password-manager.js";
import { CloudinaryProvider, type UploadResult } from "../../utils/cloudinary-provider.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";
import User from "./auth.user.models.js";


export default class AuthService {
    public static async register(registerData: RegisterInput) {
        const {
            username,
            email,
            password,
            bio,
            profileImage
        } = registerData;

        // Checking for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email == email) {
                if (existingUser.email === email) {
                    throw new ConflictError('Email is already registered');
                }
            }

            throw new ConflictError('Username is already taken.')
        }

        // Hashing the user password
        const hashedPassword = await PasswordManager.hashPassword(password);

        // Uploading profile image if provided
        let uploadedProfileImage: UploadResult | undefined;
        if (profileImage) {
            uploadedProfileImage = await CloudinaryProvider.upload(profileImage);
        }

        // Creating user and storing in the databse
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            ...(bio != undefined && { bio }),
            ...(uploadedProfileImage != undefined && { profileImage: uploadedProfileImage.url }),
        });

        // Generating access and refresh token
        const accessToken = await JwtToken.forUser(user);
        const refreshToken = await JwtToken.forUser(user, 89999);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken,
        };
    }

    public static async login(loginData: LoginInput) {
        console.log('From Auth Service login');
        const { email, password } = loginData;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const isPasswordValid = await PasswordManager.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid emial or password');
        }

        // Generating access and refresh token
        const accessToken = await JwtToken.forUser(user);
        const refreshToken = await JwtToken.forUser(user, 89999);

        return {
            user: user,
            accessToken,
            refreshToken,
        }
    }
}