import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().trim().lowercase().required(),
  }).required(),
};

export const updateCategorySchema = {
  body: Joi.object({
    newName: Joi.string().trim().lowercase().required(),
  }).required(),
  params: Joi.object({
    categoryId: generalFields._id,
  }).required(),
};

export const deleteCategorySchema = {
    
    params: Joi.object({
      categoryId: generalFields._id,
    }).required(),
  };