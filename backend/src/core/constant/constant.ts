export default class Constant {
    public static hashSalt = 12;
    public static uploadDirName = 'uploads';

    public static allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
    ];
    public static fileSizeLimit = 5 * 1024 * 1024;
}