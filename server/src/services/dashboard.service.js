import Project from "../models/project.model.js";
import redisClient
from "../config/redis.js";

export const getDashboardStatsService =
async (userId, userRole) => {

  // 🔑 unique cache key
  const cacheKey =
    `dashboard:${userId}:${userRole}`;

  // 🔍 check cache
  const cachedData =
    await redisClient.get(cacheKey);

  if (cachedData) {

    console.log("Cache HIT");

    return JSON.parse(cachedData);

  }

  console.log("Cache MISS");

  // DB query
  const matchStage =
    userRole === "admin"
      ? {}
      : { owner: userId };

  const stats =
    await Project.aggregate([
      {
        $match: matchStage
      },

      {
        $facet: {

          totalProjects: [
            {
              $count: "count"
            }
          ],

          projectsByStatus: [
            {
              $group: {
                _id: "$status",
                count: {
                  $sum: 1
                }
              }
            }
          ]

        }
      }

    ]);

  // 💾 store in cache
  await redisClient.set(

    cacheKey,

    JSON.stringify(stats[0]),

    {
      EX: 60
    }

  );

  return stats[0];

};