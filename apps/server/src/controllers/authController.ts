import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { sessionCookie } from "../config";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser({
      email: String(req.body.email).toLowerCase(),
      password: String(req.body.password),
      displayName: String(req.body.displayName || "User"),
    });
    res.status(201).json({ id: user.id, email: user.email, displayName: user.displayName });
  } catch (err: unknown) {
    res.status(400).json({ error: err instanceof Error ? err.message : "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(String(req.body.email), String(req.body.password));
    res.cookie("lts_session", result.sessionToken, sessionCookie);
    res.json({ id: result.user.id, email: result.user.email, displayName: result.user.displayName });
  } catch (err: unknown) {
    res.status(401).json({ error: err instanceof Error ? err.message : "Invalid credentials" });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("lts_session", sessionCookie);
  res.json({ message: "Logged out" });
}
