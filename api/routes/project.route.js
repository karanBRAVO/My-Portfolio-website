import express from "express";
import projectContollers from "../controllers/project.controller.js";

const router = express.Router();

router.get("/get-project-info", projectContollers.getController);
router.post("/add-project-info", projectContollers.postController);

export default router;
