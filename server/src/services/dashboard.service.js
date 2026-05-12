import Project from "../models/project.model.js";

export const getDashboardStatsService = async (
  userId,
  userRole
) => {

  // 🔐 admin sees all projects
  const matchStage =
    userRole === "admin"
      ? {}
      : { owner: userId };

  // 📊 aggregation pipeline
  const stats = await Project.aggregate([

    {
      $match: matchStage
    },

    {
      $facet: {

        // total projects
        totalProjects: [
          {
            $count: "count"
          }
        ],

        // projects grouped by status
        projectsByStatus: [
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1
              }
            }
          }
        ],

        // recent projects
        recentProjects: [
          {
            $sort: {
              createdAt: -1
            }
          },

          {
            $limit: 5
          },

          {
            $project: {
              title: 1,
              status: 1,
              createdAt: 1
            }
          }
        ]

      }
    }

  ]);

  return stats[0];

};