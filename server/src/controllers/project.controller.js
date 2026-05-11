import {
  createProjectService,
  getUserProjectsService
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

    const projects =
      await getUserProjectsService(
        req.user._id
      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Projects fetched successfully",
      data: projects
    });

  }

);