import express from "express";

import { registerUser } from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";

import { registerSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

export default router;