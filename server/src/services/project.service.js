import Project from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createProjectService = async (
  data,
  ownerId
) => {

  const project = await Project.create({
    ...data,
    owner: ownerId
  });

  return project;

};

export const getUserProjectsService = async (
  ownerId,
  queryParams
) => {

  const {
    page = 1,
    limit = 5,
    search = "",
    status
  } = queryParams;

  // 🔥 build query
  const query = {
    owner: ownerId
  };

  // 🔍 search
  if (search) {
    query.$text = {
      $search: search
    };
  }

  // 🎯 filter
  if (status) {
    query.status = status;
  }

  // 📄 pagination
  const skip =
    (Number(page) - 1) * Number(limit);

  // 📊 total count
  const totalDocuments =
    await Project.countDocuments(query);

const projects = await Project.find(query)

  .populate({
    path: "owner",
    select: "name email role"
  })

  .sort({ createdAt: -1 })

  .skip(skip)

  .limit(Number(limit))

  .lean();

  return {

    projects,

    pagination: {
      totalDocuments,
      currentPage: Number(page),
      totalPages: Math.ceil(
        totalDocuments / limit
      ),
      limit: Number(limit)
    }

  };

};

export const updateProjectService = async (
  projectId,
  ownerId,
  updateData,
  userRole
) => {

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (
    project.owner.toString() !== ownerId.toString()
    &&
    userRole !== "admin"
  ) {
    throw new ApiError(
      403,
      "You are not allowed to update this project"
    );
  }

  // 🔄 update
  Object.assign(project, updateData);

  await project.save();

  return project;

};

export const deleteProjectService = async (
  projectId,
  ownerId,
  userRole
) => {

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (
    project.owner.toString() !== ownerId.toString()
    &&
    userRole !== "admin"
  ) {
    throw new ApiError(
      403,
      "You are not allowed to delete this project"
    );
  }

  await project.deleteOne();

};

export const getSingleProjectService = async (
  projectId,
  ownerId,
  userRole
) => {

  const project = await Project.findById(
    projectId
  )

    .populate({
      path: "owner",
      select: "name email role"
    })

    .lean();

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // 🔐 ownership check
  if (
    project.owner._id.toString() !== ownerId.toString()
    &&
    userRole !== "admin"
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return project;

};