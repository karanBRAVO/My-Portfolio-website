import express from "express";
import message_to_me from "../controllers/userMessage_toMe.controller.js";
import authenticate from "../middlewares/authenticateUser.middleware.js";

const router = express.Router();

router.post("/user/send-message/to-me", authenticate, message_to_me);

export default router;
