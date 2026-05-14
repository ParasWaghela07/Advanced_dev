import express from "express";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";

import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), registerUser);

router.post("/login", authLimiter, validate(loginSchema), loginUser);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);

export default router;
