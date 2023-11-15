import { v2 as cloudinary } from "cloudinary";

const uploadImageToCloudinary = async (file, folder) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder,
    });
    return res;
  } catch (err) {
    return false;
  }
};

const removeImageFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (err) {
    return false;
  }
};

export default { uploadImageToCloudinary, removeImageFromCloudinary };
