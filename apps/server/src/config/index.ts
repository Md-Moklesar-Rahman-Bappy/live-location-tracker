import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  API_HOST: z.string().trim().min(1).default("127.0.0.1"),
  APP_ORIGIN: z.string().url().default("http://localhost:5173"),
  API_ORIGIN: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().url(),
  TEST_DATABASE_URL: z.string().url().optional(),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be >= 32 chars"),
  COOKIE_NAME: z.string().min(1).default("lts_session"),
  CORS_ALLOWED_ORIGINS: z.string().default(""),
  TRUST_PROXY: z.coerce.number().int().min(0).max(1).default(0),
  LOCATION_RETENTION_HOURS: z.coerce.number().int().positive().default(24),
  DEFAULT_SHARE_EXPIRY_MINUTES: z.coerce.number().int().positive().default(60),
  MAX_SHARE_EXPIRY_MINUTES: z.coerce.number().int().positive().default(1440),
  STALE_LOCATION_SECONDS: z.coerce.number().int().positive().default(30),
  LOG_LEVEL: z.string().default("info"),
  SEED_DEV_ACCOUNT: z.coerce.boolean().default(false),
  ENABLE_DEVELOPMENT_SEED: z.coerce.boolean().default(false),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(120),
  SOCKET_MAX_PAYLOAD_BYTES: z.coerce.number().int().positive().default(65536),
  CLEANUP_INTERVAL_MINUTES: z.coerce.number().int().positive().default(30),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("[config] Invalid environment variables:", parsed.error.flatten());
  process.exit(1);
}

export const config = parsed.data;

export const isProduction = config.NODE_ENV === "production";
export const isDevelopment = config.NODE_ENV === "development";
export const isTest = config.NODE_ENV === "test";

export const corsAllowedOrigins = config.CORS_ALLOWED_ORIGINS
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export const sessionCookie = {
  name: config.COOKIE_NAME,
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

export const shareTokenBytes = 32; // 256 bits of entropy

export const staleThresholdMs = config.STALE_LOCATION_SECONDS * 1000;

export const shareLinkPath = "/track";