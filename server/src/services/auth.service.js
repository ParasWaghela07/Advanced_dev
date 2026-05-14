import User from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

export const registerUserService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  // 🔍 find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 🔐 compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id, user.role);

  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    accessToken,

    refreshToken,
  };
};

export const refreshAccessTokenService =
async (refreshToken) => {

  if (!refreshToken) {

    throw new ApiError(
      401,
      "Refresh token required"
    );

  }

  let decoded;

  console.log("Received refresh token:", refreshToken);

  try {

    // 🔐 verify token
    decoded = jwt.verify(

      refreshToken,

      process.env.JWT_REFRESH_SECRET

    );

  } catch (error) {

    throw new ApiError(
      401,
      "Invalid or expired refresh token"
    );

  }

  const user =
    await User.findById(
      decoded.userId
    );

  if (!user) {

    throw new ApiError(
      401,
      "User not found"
    );

  }

  // 🔒 compare stored token
  if (
    user.refreshToken !== refreshToken
  ) {

    throw new ApiError(
      401,
      "Refresh token mismatch"
    );

  }

  // 🔑 generate new access token
  const newAccessToken =

    generateAccessToken(
      user._id,
      user.role
    );

  return {

    accessToken:
      newAccessToken

  };

};

export const logoutUserService =
async (userId) => {

  await User.findByIdAndUpdate(

    userId,

    {
      refreshToken: null
    }

  );

};