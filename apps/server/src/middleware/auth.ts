import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookieName = (await import("../config")).config.COOKIE_NAME;
    const sessionCookie = req.cookies?.[cookieName];
    if (!sessionCookie) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  } catch (err) {
    logger.error({ error: String(err) }, "Auth middleware error");
    return res.status(401).json({ error: "Not authenticated" });
  }
};
