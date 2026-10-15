import { Router } from "express";

const router = Router();

router.get("/view/:publicId", (req, res) => {
  res.json({ publicId: req.params.publicId, message: "Public snapshot (stub)" });
});

export default router;
