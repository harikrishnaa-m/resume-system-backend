import express from "express";
import { integratePlatform } from "../controllers/integrationController.js";

const router = express.Router();

router.post("/integrate", integratePlatform);

export default router;
