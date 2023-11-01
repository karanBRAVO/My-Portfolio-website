import express from "express";
import authenticate from "../middlewares/authenticateUser.middleware.js";
import userProfile from "../controllers/userProfile.controller.js";

const router = express.Router();

router.get(
  "/profile/get-user",
  authenticate,
  userProfile.userProfileController
);
router.get("/profile/logout-user", authenticate, userProfile.userLogout);
router.get("/profile/delete-user", authenticate, userProfile.userDelete);

export default router;
