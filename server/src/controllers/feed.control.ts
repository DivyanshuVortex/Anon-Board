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
        visible: req.body.visible,
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
      include: { user : true, responses: true },
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
        content: req.body.answer,
        feedbackId: feedbackId,
      },
    });

    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deletefeedback = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const userId = req.user?.id; // From authMiddleware

    if (!feedbackId) {
      return res.status(400).json({ message: "Feedback ID is required" });
    }

    // Find feedback
    const feedback = await prisma.feedback.findUnique({
      where: { id: Number(feedbackId) },
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Check ownership
    if (feedback.userId !== userId) {
      return res.status(403).json({ message: "You are not allowed to delete this feedback" });
    }

       // Delete responses first
    await prisma.response.deleteMany({
      where: { feedbackId: Number(feedbackId) },
    });

    // Now delete the feedback
    await prisma.feedback.delete({
      where: { id: Number(feedbackId) },
    });


    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteresponse = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const userId = req.user?.id;

    if (!responseId) {
      return res.status(400).json({ message: "Response ID is required" });
    }

    // Find the response with feedback relation
    const response = await prisma.response.findUnique({
      where: { id: Number(responseId) },
      include: { feedback: true },
    });

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    // Ownership check: user must own the feedback this response belongs to
    if (response.feedback.userId !== userId) {
      return res.status(403).json({ message: "Not allowed to delete this response" });
    }

    // Delete the response
    await prisma.response.delete({
      where: { id: Number(responseId) },
    });

    return res.status(200).json({ message: "Response deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting response:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};