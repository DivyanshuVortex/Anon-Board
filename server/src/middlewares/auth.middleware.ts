import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  user?: { id: number | string };
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized middleware" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload | string;

    if (typeof decoded === "object" && "id" in decoded) {
      req.user = { id: decoded.id as number | string };
    } else {
      // Fallback if the payload is a raw string
      req.user = { id: decoded as string };
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
