import { Router } from "express";
import {
  getMe,
  getConfig,
  login,
  logout,
  register,
  verifyAccount,
} from "../controllers/authController";
import { loginWithGoogle } from "../controllers/googleAuthController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authRateLimiter } from "../middlewares/authRateLimiter";
import { requireSignupAllowed } from "../middlewares/modeMiddleware";
import {
  loginValidators,
  registerValidators,
} from "../middlewares/authValidators";
import { verifyCaptcha } from "../middlewares/verifyCaptcha";
import {
  changePassword,
  deleteCurrentUser,
  deleteUser,
  getUserById,
  getUserData,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/config", getConfig);
router.post(
  "/register",
  requireSignupAllowed,
  authRateLimiter,
  verifyCaptcha,
  registerValidators,
  register
);
router.post(
  "/login",
  authRateLimiter,
  verifyCaptcha,
  loginValidators,
  login
);
router.post("/google", authRateLimiter, loginWithGoogle);
router.post("/logout", logout);
router.get("/me", authenticateToken, getMe);
router.get("/verify", verifyAccount);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/user", authenticateToken, getUserData);
router.put("/user/:id", authenticateToken, updateUser);
router.put("/changePassword", authenticateToken, changePassword);
router.delete("/delete", authenticateToken, deleteCurrentUser);
router.delete("/user/:id", authenticateToken, deleteUser);

export default router;
