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