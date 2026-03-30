import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

const cloudinaryCloudName =
    process.env.CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_NAME;
const cloudinaryApiSecret =
    process.env.CLOUDINARY_API_SECRET ?? process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: cloudinaryApiSecret,
})

export const uploadOnCloudinary = async(localFilePath: string) => {
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File uploaded on cloudinary", response.url);
        return response;
    }
    catch(error){
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.log("error in file upload to cloudinary", error);
        return null;
    }
}
