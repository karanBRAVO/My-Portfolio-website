import express from "express";
import projectContollers from "../controllers/project.controller.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.middleware.js";

const router = express.Router();

router.get("/get-project-info", projectContollers.getProject);
router.get(
  "/get-project-info/by-keywords",
  projectContollers.getProject_byKeywords
);
router.get(
  "/get-project-info/by-id/:id",
  authenticateAdmin,
  projectContollers.getProjectById
);
router.get(
  "/get-project-info/by-search",
  authenticateAdmin,
  projectContollers.getProject_search
);
router.post(
  "/add-project-info",
  authenticateAdmin,
  projectContollers.addProject
);
router.put(
  "/update-project-info/:id",
  authenticateAdmin,
  projectContollers.updateProject
);
router.delete(
  "/delete-project-info/:id",
  authenticateAdmin,
  projectContollers.deleteProject
);

export default router;
