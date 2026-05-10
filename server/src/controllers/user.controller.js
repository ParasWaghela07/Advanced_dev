import User from "../models/user.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(

  async (req, res) => {

    const users = await User.find()
      .select("-password");

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data: users
    });

  }

);