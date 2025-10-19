import express from "express";
import {
  createResume,
  getMyResume,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", createResume);
router.get("/", getMyResume);
router.put("/", updateResume);
router.delete("/", deleteResume);

export default router;
