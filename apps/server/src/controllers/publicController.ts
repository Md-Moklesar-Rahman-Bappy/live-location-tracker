import { Request, Response } from "express";

export async function getPublicSnapshot(req: Request, res: Response) {
  try {
    res.json({ publicId: req.params.publicId, message: "Public snapshot" });
  } catch (err: unknown) {
    res.status(404).json({ error: err instanceof Error ? err.message : "Not found" });
  }
}
