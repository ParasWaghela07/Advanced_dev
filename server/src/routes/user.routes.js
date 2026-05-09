import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

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

export default router;