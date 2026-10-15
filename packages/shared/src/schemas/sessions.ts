import { z } from "zod";

/**
 * Tracking session lifecycle status.
 */
export const sessionStatusSchema = z.enum([
  "ACTIVE",
  "STOPPED",
  "REVOKED",
  "EXPIRED",
]);

/**
 * Viewer-facing connection state of the tracker.
 */
export const locationStatusSchema = z.enum([
  "online",
  "stale",
  "disconnected",
  "stopped",
  "revoked",
  "expired",
  "permission-denied",
  "error",
]);

export const createSessionSchema = z.object({
  label: z.string().trim().max(120, "Label must be 120 characters or fewer").optional().nullable(),
  historyEnabled: z.boolean().default(true),
  expiresAt: z.string().datetime({ offset: true }).optional(),
});

export const updateSessionSchema = z.object({
  label: z.string().trim().max(120, "Label must be 120 characters or fewer").optional().nullable(),
});