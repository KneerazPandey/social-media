import UnauthorizedError from "../../errors/unauthorize-error.js";
import { CloudinaryProvider } from "../../utils/cloudinary-provider.js";
import User, { type IUser } from "../auth/auth.user.models.js";


export default class ProfileService {
    public static async addBio(userId: string, bio: string): Promise<IUser> {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedError("You are not authorized to update your bio.");
        }

        user.bio = bio.trim();
        await user.save();

        return user;
    }

    public static async updateprofilePicture(userId: string, imagePath: string) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedError("You are not authorized to update your profile picture.");
        }

        if (user.profileImage) {
            await CloudinaryProvider.deleteByUrl(user.profileImage);
        }

        const updatedImage = await CloudinaryProvider.upload(imagePath);

        user.profileImage = updatedImage.url;
        await user.save();
        return user;
    }

    public static async removeProfilePicture(userId: string) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedError("You are not authorized to remove your profile picture.");
        }
        if (user.profileImage) {
            await CloudinaryProvider.deleteByUrl(user.profileImage);
        }
        user.profileImage = '';
        await user.save();
        return user;
    }

    public static async getProfile(userId: string) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new UnauthorizedError("You are not authorized to view your profile.");
        }

        return user;
    }
}