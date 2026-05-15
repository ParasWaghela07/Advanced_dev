import logger
from "../utils/logger.js";

export const errorHandler =
(error, req, res, next) => {

  logger.error(error.stack);

  return res.status(
    error.statusCode || 500
  ).json({

    success: false,

    message:
      error.message ||
      "Internal Server Error"

  });

};