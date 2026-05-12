import rateLimit from "express-rate-limit";

import { ApiError }
from "../utils/ApiError.js";

export const authLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  handler: (req, res, next) => {

    next(
      new ApiError(
        429,
        "Too many requests, please try again later"
      )
    );

  }

});

export const apiLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  handler: (req, res, next) => {

    next(
      new ApiError(
        429,
        "API rate limit exceeded"
      )
    );

  }

});