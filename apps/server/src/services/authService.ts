import { prisma } from "../database/prisma";
import { hashPassword, verifyPassword, generateToken, hashToken, timingSafeEqual } from "../utils/crypto";
import { config } from "../config";

export async function registerUser(data: { displayName: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (existing) throw new Error("Email already registered");
  const passwordHash = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      displayName: data.displayName,
      email: data.email.toLowerCase(),
      passwordHash,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) throw new Error("Invalid credentials");
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  const token = generateToken();
  const sessionToken = hashToken(token);
  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      sessionToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return { user: { id: user.id, displayName: user.displayName, email: user.email }, sessionToken, rawToken: token };
}
