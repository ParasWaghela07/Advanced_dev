import {
  createProjectService,
  getUserProjectsService,
  updateProjectService,
  deleteProjectService,
  getSingleProjectService
} from "../services/project.service.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const createProject = asyncHandler(

  async (req, res) => {

    const project =
      await createProjectService(
        req.body,
        req.user._id
      );

    return res.status(201).json(

      new ApiResponse(
        201,
        "Project created successfully",
        project
      )

    );

  }

);

export const getUserProjects = asyncHandler(

  async (req, res) => {

    const result =
      await getUserProjectsService(
        req.user._id,
        req.query
      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Projects fetched successfully",
        {
          projects: result.projects,
          pagination: result.pagination
        }
      )

    );

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

    return res.status(200).json(

      new ApiResponse(
        200,
        "Project updated successfully",
        project
      )

    );

  }

);

export const deleteProject = asyncHandler(

  async (req, res) => {

    await deleteProjectService(

      req.params.id,

      req.user._id,

      req.user.role

    );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Project deleted successfully"
      )

    );

  }

);

export const getSingleProject = asyncHandler(

  async (req, res) => {

    const project =
      await getSingleProjectService(

        req.params.id,

        req.user._id,

        req.user.role

      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Project fetched successfully",
        project
      )

    );

  }

);