import express from "express";
import skillController from "../controllers/skill.controller.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/get-skills", skillController.getSkills);
router.post(
  "/add-skills",
  authenticateAdmin,
  upload.single("data"),
  skillController.addNewSkill
);
router.delete("/delete-skills", authenticateAdmin, skillController.deleteSkill);

export default router;
