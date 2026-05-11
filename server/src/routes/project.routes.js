import express from "express";

import {
  createProject,
  getUserProjects
} from "../controllers/project.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.js";

import {
  createProjectSchema
} from "../validations/project.validation.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  validate(createProjectSchema),
  createProject
);

router.get(
  "/",
  verifyJWT,
  getUserProjects
);

export default router;