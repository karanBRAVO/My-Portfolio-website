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

const getProject_search = async (req, res) => {
  try {
    const { searchInput } = req.query;
    const query = {
      $or: [
        { projectName: { $regex: new RegExp(searchInput, "i") } },
        { projectDescription: { $regex: new RegExp(searchInput, "i") } },
        {
          projectKeyFeatures: {
            $elemMatch: { $regex: new RegExp(searchInput, "i") },
          },
        },
        { "projectLinks.sourceName": { $regex: new RegExp(searchInput, "i") } },
        { "projectLinks.linkTo": { $regex: new RegExp(searchInput, "i") } },
        { "projectPreviews.tag": { $regex: new RegExp(searchInput, "i") } },
        { "projectPreviews.title": { $regex: new RegExp(searchInput, "i") } },
        { "projectPreviews.src": { $regex: new RegExp(searchInput, "i") } },
        { projectKeywords: { $regex: new RegExp(searchInput, "i") } },
      ],
    };

    const projects = await projectModel.find(query);
    if (!projects) {
      const error = new Error("[-] no project found.");
      throw error;
    }

    res.json({ success: true, message: "[+] Project Found.", data: projects });
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
    await projectModel.updateOne(
      { _id: id },
      {
        $set: { ...updateData },
      }
    );
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
  getProject_search,
  addProject,
  updateProject,
  deleteProject,
};
