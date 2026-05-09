import User from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";

import { generateToken } from "../utils/generateToken.js";

export const registerUserService = async (data) => {

  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
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

  // 🎟️ generate token
  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };

};