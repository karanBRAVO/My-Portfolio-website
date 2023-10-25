import TestModel from "../models/test.model.js";

const getController = (req, res) => {
  console.log("[+] Got a get request");
  res.send("Hello World!");
};

const postController = async (req, res) => {
  console.log("[+] Got a post request");
  console.log(req.body);
  let name = req.body.name;
  if (name.length > 0) {
    const addData = new TestModel({
      name: name,
    });
    await addData.save();
    res.send("[+] Data saved");
  } else {
    res.send("[!] Cannot add");
  }
};

export default { getController, postController };
