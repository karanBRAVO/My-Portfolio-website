import skillModel from "../models/skill.model.js";
import cloudinary_util from "../utilities/cloudinary/cloudinary.js";

const getSkills = async (req, res) => {
  try {
    const skills = await skillModel.find();
    if (!skills) {
      const error = new Error(`No skills found`);
      throw error;
    }

    res.json({ success: true, message: "Skills Found", skills });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addNewSkill = async (req, res) => {
  try {
    // finding image in db
    const { name } = req.body;
    if (!name) {
      const error = new Error("name is required");
      throw error;
    }
    const skill = await skillModel.findOne({ name });
    if (skill) {
      const error = new Error("skill already exists");
      throw error;
    }

    // converting to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // uploading the image
    const data = await cloudinary_util.uploadImageToCloudinary(
      dataURI,
      "skills"
    );

    // saving to db
    const saveImageToDB = new skillModel({
      name,
      public_id: data.public_id,
      imageUrl: data.url,
    });
    await saveImageToDB.save();

    res.json({ success: true, message: "Skill added successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    // getting public id
    const name = req.query.name;
    if (!name) {
      const error = new Error("name is required");
      throw error;
    }

    // searching skill from public id
    const skill = await skillModel.findOne({ name });
    if (!skill) {
      const error = new Error("skill does not exist");
      throw error;
    }

    // deleting the image from cloudinary
    const data = cloudinary_util.removeImageFromCloudinary(skill.public_id);
    if (!data) {
      const error = new Error("Failed to delete image from cloudinary");
      throw error;
    }

    // deleting the skill from db
    await skillModel.deleteOne(skill);

    res.json({ success: true, message: "Skill deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default { getSkills, addNewSkill, deleteSkill };
