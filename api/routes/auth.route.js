import express from "express";
import authControllers from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up-user", authControllers.userSignUp);
router.post("/sign-up-user/verify-user", authControllers.verifyUser);
router.post("/log-in-user", authControllers.userLogin);
router.post("/authenticate-with-google", authControllers.signIn_google);

export default router;
