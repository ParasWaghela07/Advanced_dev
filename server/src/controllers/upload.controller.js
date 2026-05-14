import {
  uploadImageService
}
from "../services/upload.service.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

export const uploadImage = asyncHandler(

  async (req, res) => {

    if (!req.file) {

      throw new Error(
        "No file uploaded"
      );

    }

    const result =
      await uploadImageService(
        req.file.buffer
      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Image uploaded successfully",
        {
          imageUrl: result.secure_url
        }
      )

    );

  }

);