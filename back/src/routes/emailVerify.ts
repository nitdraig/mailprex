import express, { Router } from "express";

const router: Router = express.Router();

router.get("/v", (_req, res) => {
  res.status(410).json({
    message:
      "This verification endpoint is deprecated. Use GET /auth/verify instead.",
  });
});

export default router;
