import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import dbConnect from "./connection/dbConn.js";
import projectRouter from "./routes/project.route.js";
import skillRouter from "./routes/skill.route.js";

const APP = express();
dotEnv.config();
dbConnect();
const PORT = process.env.PORT || 6000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use("/api", projectRouter);
APP.use("/api", skillRouter);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
