import express from "express";

import {
  uploadImage
}
from "../controllers/upload.controller.js";

import {
  verifyJWT
}
from "../middlewares/auth.middleware.js";

import {
  upload
}
from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(

  "/image",

  verifyJWT,

  upload.single("image"),

  uploadImage

);

export default router;