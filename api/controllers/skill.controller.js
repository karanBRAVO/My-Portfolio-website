import skillModel from "../models/skill.model.js";

const getController = (req, res) => {
  skillModel
    .find()
    .then((data) => {
      if (data != null && data.length > 0) {
        res.send(data);
      } else {
        res.send("[-] skills not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("[-] error while getting skills");
    });
};

const postController = async (req, res) => {
  try {
    const addDataToDb = skillModel(req.body);
    await addDataToDb.save();
    res.send("[+] skills saved.");
  } catch (err) {
    console.log(err);
    res.send("[-] error while adding skills");
  }
};

export default { getController, postController };
