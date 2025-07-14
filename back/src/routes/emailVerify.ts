import express, { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const router: Router = express.Router();

router.get("/v", async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Verification token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET!);
    const userId = (decodedToken as any).userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verified = true;
    await user.save();

    res.redirect("https://mailprex.top/login");
  } catch (error) {
    res.status(500).json({ message: "Error al verificar la cuenta", error });
  }
});

export default router;
