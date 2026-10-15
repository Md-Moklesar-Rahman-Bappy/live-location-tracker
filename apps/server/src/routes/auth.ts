import { Router } from "express";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/crypto";

const router = Router();

router.post("/register", async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8), displayName: z.string() }).parse(req.body);
  res.status(201).json({ message: "Registered (stub)", email: body.email });
});

router.post("/login", async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
  res.status(200).json({ message: "Login stub", email: body.email });
});

router.post("/logout", async (_req, res) => {
  res.status(200).json({ message: "Logged out" });
});

export default router;
