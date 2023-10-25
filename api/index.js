import express from "express";
import bodyParser from "body-parser";
import testRouter from "./routes/test.route.js";

const APP = express();
const PORT = 3000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use("/api", testRouter);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
