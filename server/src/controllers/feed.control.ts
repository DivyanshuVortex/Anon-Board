import { PrismaClient, User } from "@prisma/client";
import e, { Response, Request } from "express";

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string; // must match the Prisma cuid type
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
    const feedbackId = String(req.params.id);
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
    const feedbackId = String(req.params.id);
       const existingFeedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        user: {
          select: { username: true, createdAt: true },
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

export const showResponses = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const feedbackId = String(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { userId: userId, id: feedbackId },
      include: { user: true, responses: true },
    });

    return res.status(200).json(feedbacks);
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
      where: { id: feedbackId },
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

       // Delete responses first
    await prisma.response.deleteMany({
      where: { feedbackId: String(feedbackId) },
    });

    // Now delete the feedback
    await prisma.feedback.delete({
      where: { id: String(feedbackId) },
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
      where: { id: String(responseId) },
      include: { feedback: true },
    });

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }


    // Delete the response
    await prisma.response.delete({
      where: { id: String(responseId) },
    });

    return res.status(200).json({ message: "Response deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting response:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};