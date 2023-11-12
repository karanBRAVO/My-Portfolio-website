import projectModel from "../models/project.model.js";

const getProject = async (req, res) => {
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

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectModel.findOne({ _id: id });
    if (!project) {
      const error = new Error("[-] no project found.");
      throw error;
    }
    res.json({ success: true, message: "[+] Project Found.", data: project });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const addProject = async (req, res) => {
  try {
    const addDataToDb = new projectModel(req.body);
    await addDataToDb.save();
    res.json({ success: true, message: "[+] Project added to database." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await projectModel.updateProject({ _id: id }, updateData);
    res.json({ success: true, message: "[+] Project updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await projectModel.deleteOne({ _id: id });
    res.json({ success: true, message: "[+] Project deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default {
  getProject,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
