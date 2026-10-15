import { z } from "zod";
import { sessionStatusSchema, locationStatusSchema } from "../schemas/sessions";

export type SessionStatus = z.infer<typeof sessionStatusSchema>;
export type LocationStatus = z.infer<typeof locationStatusSchema>;

export interface TrackingSessionPublic {
  id: string;
  publicId: string;
  label: string | null;
  status: SessionStatus;
  historyEnabled: boolean;
  startedAt: string | null;
  expiresAt: string | null;
  lastLocationAt: string | null;
  createdAt: string;
}

export interface TrackingSessionOwnerView extends TrackingSessionPublic {
  ownerId: string;
  stoppedAt: string | null;
  revokedAt: string | null;
  tokenHash: string;
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  capturedAt: string;
  receivedAt?: string;
}

export interface ViewerSnapshot {
  trackingSessionId: string;
  publicId: string;
  status: SessionStatus;
  label: string | null;
  historyEnabled: boolean;
  startedAt: string | null;
  expiresAt: string | null;
  lastLocation: LocationPoint | null;
  lastLocationAt: string | null;
  locationStatus: LocationStatus;
}

export interface OwnerSnapshot extends ViewerSnapshot {
  shareUrl: string;
  expiresAt: string | null;
}