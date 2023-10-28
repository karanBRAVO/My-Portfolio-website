import express from "express";
import authenticate from "../middlewares/authenticateUser.middleware.js";
import userProfileController from "../controllers/userProfile.controller.js";

const router = express.Router();

router.get("/profile/get-user", authenticate, userProfileController);

export default router;
