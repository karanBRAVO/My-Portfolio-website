import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import dbConnect from "./connection/dbConn.js";
import projectRouter from "./routes/project.route.js";
import skillRouter from "./routes/skill.route.js";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/userProfile.route.js";
import userSubscriptionRouter from "./routes/userSubscription.route.js";
import userMessageToMeRouter from "./routes/userMessage_toMe.route.js";

const APP = express();
dotEnv.config();
dbConnect();
const PORT = process.env.PORT || 6000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use("/api", projectRouter);
APP.use("/api", skillRouter);
APP.use("/api/auth", authRouter);
APP.use("/api", profileRouter);
APP.use("/api", userSubscriptionRouter);
APP.use("/api", userMessageToMeRouter);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
