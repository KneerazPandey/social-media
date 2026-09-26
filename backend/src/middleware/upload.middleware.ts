import multer from "multer";
import path from 'node:path';
import fs from 'node:fs';
import Constant from "../core/constant/constant.js";


const uploadDir = path.resolve(Constant.uploadDirName);

if (!uploadDir) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_request, _file, callback) => {
        callback(null, uploadDir);
    },
    filename: (_request, file, callback) => {
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
        callback(null, filename);
    }
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    if (!Constant.allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
        return;
    }

    cb(null, true);
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: Constant.fileSizeLimit,
    }
});