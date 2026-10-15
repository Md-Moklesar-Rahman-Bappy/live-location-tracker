import { prisma } from "../database/prisma";
import { generatePublicId, generateToken, hashToken } from "../utils/crypto";
import { config } from "../config";

export async function createTrackingSession(ownerId: string, label?: string | null, historyEnabled?: boolean, expiresMinutes?: number) {
  const publicId = generatePublicId();
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = expiresMinutes
    ? new Date(Date.now() + expiresMinutes * 60 * 1000)
    : new Date(Date.now() + config.DEFAULT_SHARE_EXPIRY_MINUTES * 60 * 1000);
  const session = await prisma.trackingSession.create({
    data: {
      ownerId,
      publicId,
      tokenHash,
      label: label || null,
      status: "ACTIVE",
      historyEnabled: historyEnabled !== undefined ? historyEnabled : true,
      expiresAt,
    },
  });
  return { session, publicId, rawToken, shareUrl: `${config.APP_ORIGIN}/track/${publicId}?token=${rawToken}` };
}
