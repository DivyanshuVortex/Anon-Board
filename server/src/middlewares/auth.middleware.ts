import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log(`\n🚀 Route: ${req.method} ${req.originalUrl}`);
    console.log(`🔑 Raw Authorization header:`, req.headers.authorization);

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Unauthorized middleware" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    console.log("📦 Decoded JWT:", decoded);

    if (!decoded || typeof decoded.id !== "number") {
      console.log("❌ Invalid token payload");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: decoded.id };

    console.log("✅ User ID set in request:", req.user.id);

    next();
  } catch (err) {
    console.log("❌ Token verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
