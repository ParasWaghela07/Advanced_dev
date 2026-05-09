import User from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";

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