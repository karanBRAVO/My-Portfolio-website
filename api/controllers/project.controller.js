import projectModel from "../models/project.model.js";

const getController = async (req, res) => {
  try {
    const projects = await projectModel.find();
    if (!projects) {
      const error = new Error("[-] no projects found.");
      throw error;
    }
    res.json({ success: true, message: "[+] Projects sent.", data: projects });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const postController = async (req, res) => {
  try {
    const addDataToDb = new projectModel(req.body);
    await addDataToDb.save();
    res.json({ success: true, message: "[+] Project added to database." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default { getController, postController };
