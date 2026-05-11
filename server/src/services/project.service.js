import Project from "../models/project.model.js";

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
  ownerId
) => {

  const projects = await Project.find({
    owner: ownerId
  })
    .sort({ createdAt: -1 });

  return projects;

};