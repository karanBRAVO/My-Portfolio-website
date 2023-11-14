import express from "express";
import projectContollers from "../controllers/project.controller.js";

const router = express.Router();

router.get("/get-project-info", projectContollers.getProject);
router.get("/get-project-info/by-id/:id", projectContollers.getProjectById);
router.get("/get-project-info/by-search", projectContollers.getProject_search);
router.post("/add-project-info", projectContollers.addProject);
router.put("/update-project-info/:id", projectContollers.updateProject);
router.delete("/delete-project-info/:id", projectContollers.deleteProject);

export default router;
