import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// 👇 Extend Request type to add user
interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized middleware" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  if (!decoded) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (typeof decoded === "object" && "id" in decoded) {
    req.user = (decoded as JwtPayload).id;
  } else {
    req.user = decoded;
  }
  next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
