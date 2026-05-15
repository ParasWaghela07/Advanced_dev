import Project from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import redisClient from "../config/redis.js";
import { io }
from "../index.js";
import logger from "../utils/logger.js";

export const createProjectService = async (data, ownerId) => {
  const project = await Project.create({
    ...data,
    owner: ownerId,
  });

  // 🗑️ invalidate cache
  const keys = await redisClient.keys(`projects:${ownerId}:*`);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  return project;
};

export const getUserProjectsService = async (ownerId, queryParams) => {
  const { page = 1, limit = 5, search = "", status } = queryParams;

  // 🔑 unique cache key
  const cacheKey = `projects:${ownerId}:${page}:${limit}:${search}:${status}`;

  // 🔍 check cache
  const cachedProjects = await redisClient.get(cacheKey);

  // ✅ cache hit
  if (cachedProjects) {
    logger.info("Projects Cache HIT");

    return JSON.parse(cachedProjects);
  }

  logger.info("Projects Cache MISS");

  // 🔥 build query
  const query = {
    owner: ownerId,
  };

  // 🔍 search
  if (search) {
    query.$text = {
      $search: search,
    };
  }

  // 🎯 filter
  if (status) {
    query.status = status;
  }

  // 📄 pagination
  const skip = (Number(page) - 1) * Number(limit);

  // 📊 total count
  const totalDocuments = await Project.countDocuments(query);

  const projects = await Project.find(query)

    .select("title description status owner createdAt")

    .populate({
      path: "owner",
      select: "name email role",
    })

    .sort({ createdAt: -1 })

    .skip(skip)

    .limit(Number(limit))

    .lean();

  const response = {
    projects,

    pagination: {
      totalDocuments,

      currentPage: Number(page),

      totalPages: Math.ceil(totalDocuments / limit),

      limit: Number(limit),
    },
  };

  // 💾 store in redis
  await redisClient.set(
    cacheKey,

    JSON.stringify(response),

    {
      EX: 60,
    },
  );

  return response;
};
export const updateProjectService = async (
  projectId,
  ownerId,
  updateData,
  userRole,
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (project.owner.toString() !== ownerId.toString() && userRole !== "admin") {
    throw new ApiError(403, "You are not allowed to update this project");
  }

  // 🔄 update
  Object.assign(project, updateData);

  await project.save();

io.to(ownerId.toString()).emit(

  "projectUpdated",

  {
    message: "Project updated",
    project
  }

);

  const keys = await redisClient.keys(`projects:${ownerId}:*`);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  return project;
};

export const deleteProjectService = async (projectId, ownerId, userRole) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (project.owner.toString() !== ownerId.toString() && userRole !== "admin") {
    throw new ApiError(403, "You are not allowed to delete this project");
  }

  const keys = await redisClient.keys(`projects:${ownerId}:*`);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  await project.deleteOne();
};

export const getSingleProjectService = async (projectId, ownerId, userRole) => {
  const project = await Project.findById(projectId)

    .populate({
      path: "owner",
      select: "name email role",
    })

    .lean();

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (
    project.owner._id.toString() !== ownerId.toString() &&
    userRole !== "admin"
  ) {
    throw new ApiError(403, "Access denied");
  }

  return project;
};
