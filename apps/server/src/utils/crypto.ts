import crypto from "node:crypto";
import argon2 from "argon2";

/**
 * Hash a password using Argon2id.
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

/**
 * Verify a password against an Argon2 hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically secure random token (hex encoded).
 */
export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Hash a share token with SHA-256 for one-way storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Timing-safe comparison of two hex strings.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

/**
 * Generate a URL-safe public id (128 bits).
 */
export function generatePublicId(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Secure random int in [0, max).
 */
export function secureRandomInt(max: number): number {
  if (!Number.isInteger(max) || max <= 0) throw new Error("max must be a positive integer");
  return crypto.randomInt(max);
}