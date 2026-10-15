-- Create extension for uuid generation if not present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "User_email_key" UNIQUE ("email")
);

CREATE INDEX "User_email_idx" ON "User" ("email");
CREATE INDEX "User_status_idx" ON "User" ("status");
CREATE INDEX "User_createdAt_idx" ON "User" ("createdAt");

-- Auth sessions
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AuthSession_sessionToken_key" UNIQUE ("sessionToken")
);

CREATE INDEX "AuthSession_userId_idx" ON "AuthSession" ("userId");
CREATE INDEX "AuthSession_expiresAt_idx" ON "AuthSession" ("expiresAt");
CREATE INDEX "AuthSession_revokedAt_idx" ON "AuthSession" ("revokedAt");

ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Tracking sessions
CREATE TABLE "TrackingSession" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "label" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "historyEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP,
    "expiresAt" TIMESTAMP,
    "stoppedAt" TIMESTAMP,
    "revokedAt" TIMESTAMP,
    "lastLocationAt" TIMESTAMP,
    CONSTRAINT "TrackingSession_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TrackingSession_publicId_key" UNIQUE ("publicId")
);

CREATE INDEX "TrackingSession_ownerId_idx" ON "TrackingSession" ("ownerId");
CREATE INDEX "TrackingSession_publicId_idx" ON "TrackingSession" ("publicId");
CREATE INDEX "TrackingSession_status_idx" ON "TrackingSession" ("status");
CREATE INDEX "TrackingSession_expiresAt_idx" ON "TrackingSession" ("expiresAt");
CREATE INDEX "TrackingSession_lastLocationAt_idx" ON "TrackingSession" ("lastLocationAt");
CREATE INDEX "TrackingSession_ownerId_status_idx" ON "TrackingSession" ("ownerId", "status");

ALTER TABLE "TrackingSession" ADD CONSTRAINT "TrackingSession_ownerId_fkey"
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Location points
CREATE TABLE "LocationPoint" (
    "id" TEXT NOT NULL,
    "trackingSessionId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "capturedAt" TIMESTAMP NOT NULL,
    "receivedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LocationPoint_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LocationPoint_trackingSessionId_idx" ON "LocationPoint" ("trackingSessionId");
CREATE INDEX "LocationPoint_capturedAt_idx" ON "LocationPoint" ("capturedAt");
CREATE INDEX "LocationPoint_trackingSessionId_capturedAt_idx" ON "LocationPoint" ("trackingSessionId", "capturedAt");

ALTER TABLE "LocationPoint" ADD CONSTRAINT "LocationPoint_trackingSessionId_fkey"
    FOREIGN KEY ("trackingSessionId") REFERENCES "TrackingSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Security events
CREATE TABLE "SecurityEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "eventType" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SecurityEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SecurityEvent_eventType_idx" ON "SecurityEvent" ("eventType");
CREATE INDEX "SecurityEvent_createdAt_idx" ON "SecurityEvent" ("createdAt");
CREATE INDEX "SecurityEvent_userId_idx" ON "SecurityEvent" ("userId");

ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;