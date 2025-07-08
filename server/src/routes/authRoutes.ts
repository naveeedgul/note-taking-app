import express from "express";
import {
  signup,
  login,
  verifyOtp,
  googleLogin,
} from "../controllers/authController";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/google-login", googleLogin);

export default router;
