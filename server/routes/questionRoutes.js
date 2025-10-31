import express from "express";
import { getQuestionsByCategory, createQuestion } from "../controllers/questionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:categoryId", getQuestionsByCategory);
router.post("/", verifyToken, createQuestion);

export default router;
