import { Router } from "express";

const router = Router();

router.get("/liveness", (_req, res) => {
  res.json({ status: "alive" });
});

router.get("/ready", (_req, res) => {
  res.json({ status: "ready", database: "postgresql" });
});

export default router;
