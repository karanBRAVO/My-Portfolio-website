import express from "express";
import authControllers from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up-user", authControllers.userSignUp);
router.post("/log-in-user", authControllers.userLogin);

export default router;
