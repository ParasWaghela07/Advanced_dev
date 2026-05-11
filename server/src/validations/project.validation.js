import Joi from "joi";

export const createProjectSchema = Joi.object({

  title: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .allow(""),

  status: Joi.string()
    .valid("active", "completed")

});