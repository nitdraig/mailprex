import { Router } from "express";
import { login, register, verifyAccount } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  changePassword,
  deleteUser,
  getUserById,
  getUserData,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyAccount);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/user", authenticateToken, getUserData);
router.put("/user/:id", authenticateToken, updateUser);
router.put("/changePassword", authenticateToken, changePassword);
router.delete("/user/:id", authenticateToken, deleteUser);
export default router;
