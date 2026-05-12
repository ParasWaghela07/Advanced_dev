import express from "express";

import {
  registerUser,
  loginUser
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  authLimiter
}
from "../middlewares/rateLimit.middleware.js";

import {
  registerSchema,
  loginSchema
} from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  registerUser
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  loginUser
);

export default router;