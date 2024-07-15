import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";
// ==================================== sign up schema ===================================

export const signUpSchema = {
  body: Joi.object({
    userName: Joi.string().trim().lowercase().required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }).required(),
};

// =================================== log in schema =============================

export const logInSchema = {
  body: Joi.object({
    userName: Joi.string().required(),

    password: Joi.string().required(),
  }).required(),
};
