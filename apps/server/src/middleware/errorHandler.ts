import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({ message: err.message, stack: err.stack }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
};
