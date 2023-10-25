const getController = (req, res) => {
  res.send("Hello World!");
};

const postController = (req, res) => {
  console.log(req.body);
  res.send("[+] Data saved");
};

export default { getController, postController };
