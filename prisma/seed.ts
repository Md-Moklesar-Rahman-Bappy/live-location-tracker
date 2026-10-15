/**
 * Development seed script.
 *
 * This script is ONLY for local development. It must never run in production.
 * It creates a single development account with a clearly documented,
 * non-production password and no real credentials.
 *
 * Run with: npx prisma db seed --schema=prisma/schema.prisma
 * Guarded by SEED_DEV_ACCOUNT env var and NODE_ENV check.
 */

import { PrismaClient } from "../prisma/generated";
import { hashPassword } from "../apps/server/src/utils/crypto";
import { config } from "../apps/server/src/config";

const prisma = new PrismaClient();

async function main() {
  // Hard guard: never seed outside local development.
  if (config.nodeEnv !== "development") {
    console.log("[seed] Skipping: NODE_ENV is not development.");
    return;
  }

  if (!config.seedDevAccount) {
    console.log("[seed] Skipping: SEED_DEV_ACCOUNT is not enabled.");
    return;
  }

  const email = "dev@example.invalid";
  const displayName = "Dev User";
  const password = "DevPassword123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("[seed] Development account already exists. Skipping.");
    return;
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      displayName,
      email,
      passwordHash,
    },
  });

  console.log(`[seed] Created development account: ${email} / ${password}`);
  console.log(`[seed] User id: ${user.id}`);
  console.log("[seed] This account is for local development only. Never use in production.");
}

main()
  .catch((err) => {
    console.error("[seed] Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });