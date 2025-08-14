import { PrismaClient } from "@prisma/client";
import e, { Response, Request } from "express";

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const createFeedback = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log(req.user?.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(400).json({ error: "User not found ------------------" });
    }

    const feedback = await prisma.feedback.create({
      data: {
        content: req.body.content,
        userId: userId, // Directly set foreign key
      },
    });

    return res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const showFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackId = parseInt(req.params.id as string);
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: { user: true, responses: true },
    });

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    return res.status(200).json(feedback);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const answerFeedback = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const feedbackId = parseInt(req.params.id as string);
    console.log("Feedback ID:", feedbackId);
       const existingFeedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        user: {
          select: { username: true,createdAt: true }, 
        }
      }
    });

    if (!existingFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    const response = await prisma.response.create({
      data: {
        content: req.body.content,
        feedbackId: feedbackId,
      },
    });

    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
