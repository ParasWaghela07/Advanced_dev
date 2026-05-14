import User from "../models/user.model.js";

export const getAllUsersService = async () => {

  const users = await User.find()

    .select("-password -refreshToken")
    
    .lean();

  return users;

};


export const getProfileService =
async (userId) => {

  const user = await User.findById(userId)

    .select("-password -refreshToken")

    .lean();

  if (!user) {

    throw new ApiError(
      404,
      "User not found"
    );

  }

  return user;

};