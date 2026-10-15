import { z } from "zod";
import { locationPointSchema, shareTokenSchema, publicIdSchema } from "./auth";

/**
 * Client -> Server socket events.
 */
export const joinOwnerSchema = z.object({
  trackingSessionId: z.string().uuid("Invalid tracking session id"),
});

export const joinViewerSchema = z.object({
  publicId: publicIdSchema,
  token: shareTokenSchema,
});

export const locationUpdateSchema = z.object({
  trackingSessionId: z.string().uuid("Invalid tracking session id"),
  location: locationPointSchema,
  // Optional client-reported timestamp (ms since epoch). Server still enforces freshness.
  capturedAt: z.number().int().positive().optional(),
});

export const stopSessionSchema = z.object({
  trackingSessionId: z.string().uuid("Invalid tracking session id"),
});

export const leaveSchema = z.object({
  trackingSessionId: z.string().uuid("Invalid tracking session id").optional(),
});

/**
 * Server -> Client socket events.
 */
export const snapshotSchema = z.object({
  trackingSessionId: z.string().uuid(),
  publicId: publicIdSchema,
  status: z.string(),
  lastLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    accuracy: z.number(),
    capturedAt: z.string(),
  }).optional().nullable(),
  startedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  historyEnabled: z.boolean(),
  label: z.string().nullable().optional(),
});

export const locationUpdatedSchema = z.object({
  trackingSessionId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  accuracy: z.number(),
  altitude: z.number().nullable().optional(),
  heading: z.number().nullable().optional(),
  speed: z.number().nullable().optional(),
  capturedAt: z.string(),
  receivedAt: z.string(),
});

export const statusSchema = z.object({
  trackingSessionId: z.string().uuid(),
  status: z.string(),
  message: z.string().optional(),
  lastLocationAt: z.string().optional(),
});

export const errorSchema = z.object({
  event: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

export const expiredSchema = z.object({
  trackingSessionId: z.string().uuid(),
  message: z.string(),
});

export const revokedSchema = z.object({
  trackingSessionId: z.string().uuid(),
  message: z.string(),
});

/**
 * Map of event name -> payload schema for validation.
 */
export const socketPayloadSchemas = {
  "tracking:join-owner": joinOwnerSchema,
  "tracking:join-viewer": joinViewerSchema,
  "location:update": locationUpdateSchema,
  "tracking:stop": stopSessionSchema,
  "tracking:leave": leaveSchema,
} as const;

export const socketEventSchemas = {
  "tracking:snapshot": snapshotSchema,
  "location:updated": locationUpdatedSchema,
  "tracking:status": statusSchema,
  "tracking:error": errorSchema,
  "tracking:expired": expiredSchema,
  "tracking:revoked": revokedSchema,
} as const;

export type SocketClientEvent = keyof typeof socketPayloadSchemas;
export type SocketServerEvent = keyof typeof socketEventSchemas;