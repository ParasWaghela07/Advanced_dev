import {
  getDashboardStatsService
} from "../services/dashboard.service.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(

  async (req, res) => {

    const stats =
      await getDashboardStatsService(

        req.user._id,

        req.user.role

      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Dashboard stats fetched successfully",
        stats
      )

    );

  }

);