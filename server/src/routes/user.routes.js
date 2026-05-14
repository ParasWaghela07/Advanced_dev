import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/rbac.middleware.js";

import { getAllUsers,getProfile } from "../controllers/user.controller.js";

const router = express.Router();

// 👤 logged in user
router.get(
  "/profile",

  verifyJWT,

  getProfile,
);

// 👑 admin only
router.get("/", verifyJWT, authorizeRoles("admin"), getAllUsers);

export default router;
