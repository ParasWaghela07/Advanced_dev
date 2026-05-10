import {
  registerUserService,
  loginUserService
} from "../services/auth.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {

  const user = await registerUserService(req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: user
  });

});

export const loginUser = asyncHandler(async (req, res) => {

  const data = await loginUserService(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Login successful",
    data
  });

});