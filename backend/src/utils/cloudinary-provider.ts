import fs from 'node:fs';
import cloudinary from "../config/cloudinary.js";
import UploadError from '../errors/upload-error.js';


export interface UploadResult {
    url: string;
    publicId: string;
}

export class CloudinaryProvider {
    public static async upload(localFilePath: string): Promise<UploadResult> {
        try {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            });
            fs.unlinkSync(localFilePath);
            var result: UploadResult = {
                url: response.secure_url,
                publicId: response.public_id,
            }
            return result
        } catch (error) {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath)
            }
            throw new UploadError();
        }
    }

    public static async delete(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            throw new UploadError();
        }
    }

    public static async deleteByUrl(url: string): Promise<void> {
        const parts = new URL(url).pathname.split('/');

        const uploadIndex = parts.indexOf('upload');

        if (uploadIndex === -1) {
            throw new Error('Invalid Cloudinary URL');
        }

        let publicIdParts = parts.slice(uploadIndex + 1);

        if (/^v\d+$/.test(publicIdParts[0] || '')) {
            publicIdParts = publicIdParts.slice(1);
        }

        const publicId = publicIdParts.join('/');

        const lastDot = publicId.lastIndexOf('.');
        const publicIdWithoutExtension = lastDot === -1 ? publicId : publicId.slice(0, lastDot);

        await cloudinary.uploader.destroy(publicIdWithoutExtension);

    }

    public static async bufferUplaod(buffer: Buffer, folderName: string): Promise<UploadResult> {


        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folderName,
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error ?? new UploadError());
                        return;
                    }

                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                },
            );

            uploadStream.end(buffer);
        });


    }
}