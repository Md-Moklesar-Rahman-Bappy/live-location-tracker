import pino from "pino";
import { config } from "../config";

/**
 * Structured logger. Never logs raw share tokens, passwords, or exact coordinates.
 */
export const logger = pino({
  level: config.LOG_LEVEL,
  redact: {
    paths: [
      "req.headers.cookie",
      "req.body.password",
      "req.body.confirmPassword",
      "req.body.token",
      "shareToken",
      "token",
      "passwordHash",
      "latitude",
      "longitude",
      "location.latitude",
      "location.longitude",
      "ip",
      "ipAddress",
      "userAgent",
    ],
    censor: "[REDACTED]",
  },
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
});

export function createLogger(name: string) {
  return logger.child({ component: name });
}