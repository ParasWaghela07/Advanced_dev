import { registerUserService } from "../services/auth.service.js";

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