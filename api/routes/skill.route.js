import express from "express";
import skillController from "../controllers/skill.controller.js";

const router = express.Router();

router.get("/get-skills", skillController.getController);
router.post("/add-skills", skillController.postController);

export default router;
