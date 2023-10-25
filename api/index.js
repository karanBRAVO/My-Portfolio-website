import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import dbConnect from "./connection/dbConn.js";
import testRouter from "./routes/test.route.js";

const APP = express();
dotEnv.config();
dbConnect();
const PORT = process.env.PORT || 6000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use("/api", testRouter);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
