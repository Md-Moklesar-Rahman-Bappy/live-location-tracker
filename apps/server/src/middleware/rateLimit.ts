import { Request, Response, NextFunction } from "express";

const rateLimits: Record<string, { count: number; resetTime: number }> = {};

export const rateLimitMiddleware = (windowMs = 60000, maxRequests = 120) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    if (!rateLimits[key] || now > rateLimits[key].resetTime) {
      rateLimits[key] = { count: 1, resetTime: now + windowMs };
      return next();
    }
    rateLimits[key].count++;
    if (rateLimits[key].count > maxRequests) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  };
};
