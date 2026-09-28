import { v2 as cloudinary } from "cloudinary";
import Env from "./env.js";

cloudinary.config({
    api_key: Env.CLOUDINARY_API_KEY,
    api_secret: Env.CLOUDINARY_API_SECRET,
    cloud_name: Env.CLOUDINARY_CLOUD_NAME
});


export default cloudinary;