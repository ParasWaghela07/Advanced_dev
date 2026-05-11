import {
  createProjectService,
  getUserProjectsService,
    updateProjectService,
  deleteProjectService
} from "../services/project.service.js";



import { asyncHandler } from "../utils/asyncHandler.js";

export const createProject = asyncHandler(

  async (req, res) => {

    const project =
      await createProjectService(
        req.body,
        req.user._id
      );

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Project created successfully",
      data: project
    });

  }

);

export const getUserProjects = asyncHandler(

  async (req, res) => {

    const result =
      await getUserProjectsService(
        req.user._id,
        req.query
      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Projects fetched successfully",
      data: result.projects,

      pagination: result.pagination
    });

  }

);

export const updateProject = asyncHandler(

  async (req, res) => {

    const project =
      await updateProjectService(

        req.params.id,

        req.user._id,

        req.body,

        req.user.role

      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Project updated successfully",
      data: project
    });

  }

);

export const deleteProject = asyncHandler(

  async (req, res) => {

    await deleteProjectService(

      req.params.id,

      req.user._id,

      req.user.role

    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Project deleted successfully"
    });

  }

);