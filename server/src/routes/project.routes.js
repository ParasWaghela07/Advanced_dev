import express from "express";

import {
  createProject,
  getUserProjects,
    updateProject,
  deleteProject,
  getSingleProject
} from "../controllers/project.controller.js";



import { verifyJWT } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.js";

import {
  createProjectSchema,
  updateProjectSchema
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

router.get(
  "/:id",
  verifyJWT,
  getSingleProject
);

router.patch(
  "/:id",
  verifyJWT,
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  "/:id",
  verifyJWT,
  deleteProject
);

export default router;