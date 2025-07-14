import express from "express";
import {
  generateFormToken,
  getFormToken,
  deleteFormToken,
} from "../controllers/formTokenController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/generateToken", authenticateToken, generateFormToken);
router.get("/getFormToken", authenticateToken, getFormToken);
router.delete("/deleteToken", authenticateToken, deleteFormToken);

export default router;
