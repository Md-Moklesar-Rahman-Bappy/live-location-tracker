import { z } from "zod";

/**
 * Normalized email: lowercased, trimmed.
 */
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address")
  .max(254, "Email must be 254 characters or fewer");

/**
 * Password policy: minimum 8 characters, maximum 128.
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be 128 characters or fewer");

export const displayNameSchema = z
  .string()
  .trim()
  .min(1, "Display name is required")
  .max(80, "Display name must be 80 characters or fewer");

export const registerSchema = z.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  acceptTerms: z.literal(true, {
    error: "You must accept the privacy policy and acceptable use terms",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Coordinate validation helpers.
 */
export const coordinateSchema = z
  .number()
  .finite("Latitude/longitude must be a finite number")
  .min(-90, "Latitude must be between -90 and 90")
  .max(90, "Latitude must be between -90 and 90");

export const longitudeSchema = z
  .number()
  .finite("Latitude/longitude must be a finite number")
  .min(-180, "Longitude must be between -180 and 180")
  .max(180, "Longitude must be between -180 and 180");

export const accuracySchema = z
  .number()
  .finite("Accuracy must be a finite number")
  .min(0, "Accuracy must be non-negative")
  .max(10000, "Accuracy must be 10000 meters or less");

export const locationPointSchema = z.object({
  latitude: coordinateSchema,
  longitude: longitudeSchema,
  accuracy: accuracySchema,
  altitude: z.number().finite().optional().nullable(),
  heading: z.number().finite().min(0).max(360).optional().nullable(),
  speed: z.number().finite().min(0).optional().nullable(),
  capturedAt: z.number().int().positive("capturedAt must be a positive timestamp").optional(),
});

export const shareTokenSchema = z
  .string()
  .trim()
  .min(32, "Share token must be at least 32 characters")
  .max(256, "Share token must be 256 characters or fewer");

export const publicIdSchema = z
  .string()
  .trim()
  .min(8, "Public id must be at least 8 characters")
  .max(64, "Public id must be 64 characters or fewer")
  .regex(/^[a-zA-Z0-9_-]+$/, "Public id must be alphanumeric, dash, or underscore");