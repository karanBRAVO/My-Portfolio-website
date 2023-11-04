import express from "express";
import authenticate from "../middlewares/authenticateUser.middleware.js";
import userProfile from "../controllers/userProfile.controller.js";
import authenticate_userPasswordReset from "../middlewares/authenticateUser_resetPassword.middleware.js";

const router = express.Router();

router.get(
  "/profile/get-user",
  authenticate,
  userProfile.userProfileController
);
router.post("/profile/upload-image", authenticate, userProfile.userUploadImage);
router.get("/profile/logout-user", authenticate, userProfile.userLogout);
router.get("/profile/delete-user", authenticate, userProfile.userDelete);
router.post(
  "/profile/forget-password/send-otp",
  userProfile.forgetPassword_sendOtp
);
router.post(
  "/profile/forget-password/verify-otp",
  authenticate_userPasswordReset,
  userProfile.forgetPassword_verifyOtp
);
router.post(
  "/profile/forget-password/reset-password",
  authenticate_userPasswordReset,
  userProfile.resetPassword
);

export default router;
