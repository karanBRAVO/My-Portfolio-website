import projectModel from "../models/project.model.js";

const getController = (req, res) => {
  projectModel
    .find()
    .then((data) => {
      if (data != null && data.length > 0) {
        res.send(data);
      } else {
        res.send("[-] projects not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const postController = async (req, res) => {
  try {
    const addDataToDb = new projectModel(req.body);
    await addDataToDb.save();
    res.send("[+] project info added to db.");
  } catch (err) {
    console.log(err);
  }
};

export default { getController, postController };
