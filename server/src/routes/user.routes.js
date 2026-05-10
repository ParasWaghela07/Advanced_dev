import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/rbac.middleware.js";

import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// 👤 logged in user
router.get(
  "/profile",
  verifyJWT,
  (req, res) => {

    return res.status(200).json({
      success: true,
      user: req.user
    });

  }
);

// 👑 admin only
router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;