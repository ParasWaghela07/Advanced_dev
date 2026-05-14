import {
  registerUserService,
  loginUserService,
  refreshAccessTokenService
  ,logoutUserService
} from "../services/auth.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const data = await loginUserService(req.body);

  // 🍪 set refresh token cookie
  res.cookie(
    "refreshToken",

    data.refreshToken,

    {
      httpOnly: true,

      secure: false,

      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  );

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: data.user,
      accessToken: data.accessToken,
    }),
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  // 🍪 get refresh token from cookie
  const refreshToken = req.cookies.refreshToken;

  const data = await refreshAccessTokenService(refreshToken);

  return res
    .status(200)
    .json(new ApiResponse(200, "Access token refreshed", data));
});

export const logoutUser = asyncHandler(async (req, res) => {
  await logoutUserService(req.user._id);

  res.clearCookie("refreshToken");

  return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});
