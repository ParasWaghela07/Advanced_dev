import { createClient } from "redis";
import logger from "../utils/logger.js";

const redisClient = createClient({

  url: process.env.REDIS_URL

});

redisClient.on("error", (err) => {

  logger.error("Redis Error:", err);

});

export const connectRedis = async () => {

  await redisClient.connect();

  logger.info("Redis Connected");

};

export default redisClient;