import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import cors from "cors";
import dbConnect from "./connection/dbConn.js";
import { v2 as cloudinary } from "cloudinary";
import projectRouter from "./routes/project.route.js";
import skillRouter from "./routes/skill.route.js";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/userProfile.route.js";
import userSubscriptionRouter from "./routes/userSubscription.route.js";
import userMessageToMeRouter from "./routes/userMessage_toMe.route.js";
import adminRouter from "./routes/admin.route.js";

const APP = express();
dotEnv.config();
APP.use(
  cors({
    origin: "https://my-portfolio-my-blog.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
dbConnect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
APP.use(cookieParser());
const PORT = process.env.PORT || 6000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use("/api", projectRouter);
APP.use("/api", skillRouter);
APP.use("/api/auth", authRouter);
APP.use("/api", profileRouter);
APP.use("/api", userSubscriptionRouter);
APP.use("/api", userMessageToMeRouter);
APP.use("/api", adminRouter);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
