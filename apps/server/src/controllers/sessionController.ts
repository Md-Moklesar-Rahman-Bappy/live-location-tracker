import { Request, Response } from "express";
import { createTrackingSession } from "../services/sessionService";

export async function createSession(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user?.id || req.body.ownerId || "dev-owner";
    const result = await createTrackingSession(
      ownerId,
      req.body.label,
      req.body.historyEnabled,
      req.body.expiresMinutes ? Number(req.body.expiresMinutes) : undefined
    );
    res.status(201).json({
      sessionId: result.session.id,
      publicId: result.publicId,
      shareUrl: result.shareUrl,
    });
  } catch (err: unknown) {
    res.status(400).json({ error: err instanceof Error ? err.message : "Failed to create session" });
  }
}
