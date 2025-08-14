import express from "express";
import { signin, signup, profile } from "../controllers/auth.contoller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createFeedback,
  answerFeedback,
  showFeedback,
  deletefeedback,
  deleteresponse,
} from "../controllers/feed.control";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, profile);

// Feedback routes
router.post("/create", authMiddleware, createFeedback);
router.get("/feedback/:id", showFeedback);
router.post("/feedback/:id", answerFeedback);

router.delete("/feedback/:feedbackId", authMiddleware, deletefeedback);
router.delete(
  "/feedback/:feedbackId/response/:responseId",
  authMiddleware,
  deleteresponse
);
export default router;
