import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Sessions endpoint" });
});

router.post("/", (_req, res) => {
  res.status(201).json({ message: "Session created (stub)" });
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id, message: "Session detail (stub)" });
});

router.post("/:id/stop", (_req, res) => {
  res.json({ message: "Stopped (stub)" });
});

router.post("/:id/revoke", (_req, res) => {
  res.json({ message: "Revoked (stub)" });
});

router.post("/:id/rotate", (_req, res) => {
  res.json({ message: "Rotated (stub)" });
});

router.delete("/:id/history", (_req, res) => {
  res.json({ message: "History cleared (stub)" });
});

router.delete("/:id", (_req, res) => {
  res.json({ message: "Deleted (stub)" });
});

export default router;
