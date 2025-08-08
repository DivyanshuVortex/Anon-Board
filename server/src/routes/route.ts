import express from "express";
import { signin, signup,profile } from "../controllers/auth.contoller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, profile);


export default router;
