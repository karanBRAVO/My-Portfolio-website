import express from "express";
import userSubscriptionController from "../controllers/userSubscription.controller.js";
import authenticate from "../middlewares/authenticateUser.middleware.js";

const router = express.Router();

router.post(
  "/user/subscribe-user",
  authenticate,
  userSubscriptionController.userSubscription
);

export default router;
