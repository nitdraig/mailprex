import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/requireAdmin";
import {
  deleteUser,
  getPlatformStats,
  getUserDetail,
  listSends,
  listUsers,
  revokeUserFormToken,
  updateUser,
} from "../controllers/adminController";

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get("/stats", getPlatformStats);
router.get("/users", listUsers);
router.get("/users/:id", getUserDetail);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users/:id/revoke-token", revokeUserFormToken);
router.get("/sends", listSends);

export default router;
