import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const createTaskSchema = {
  body: Joi.object({
    type: Joi.string().valid("text", "list").required(),
    categoryId: generalFields._id,
    shared: Joi.string().lowercase().valid("public", "private").required(),
    body: Joi.when("type", {
      is: Joi.string().valid("text"),
      then: Joi.string().required(),
      otherwise: Joi.array().items(Joi.string()).required(),
    }),
  }).required(),
};

export const getTasksSchema = {
  query: Joi.object({
    filterByCategoryName: Joi.string(),
    filterByShared: Joi.string().valid("public", "private"),
    sortBy: Joi.string().valid("categoryName", "shared"),
    page: Joi.number(),
    limit: Joi.number(),
  }).optional(),
};

export const updateTaskSchema = {
  body: Joi.object({
    type: Joi.string().valid("text", "list").optional(),
    categoryId: generalFields._id,
    shared: Joi.string().lowercase().valid("public", "private").optional(),
    body: Joi.when("type", {
      is: Joi.string().valid("text"),
      then: Joi.string(),
      otherwise: Joi.array().items(Joi.string()),
    }).optional(),
  }),
  params: Joi.object({
    taskId: generalFields._id,
  }).required(),
};

export const deleteTaskSchema = {
  params: Joi.object({
    taskId: generalFields._id,
  }).required(),
};
