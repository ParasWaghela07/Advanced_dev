import User from "../models/user.model.js";

export const getAllUsersService = async () => {

  const users = await User.find()

    .select("-password")

    .lean();

  return users;

};