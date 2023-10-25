import express from "express";
import testContollers from "../controllers/test.controller.js";

const router = express.Router();

router.get("/test/get", testContollers.getController);
router.post("/test/post", testContollers.postController);

export default router;
