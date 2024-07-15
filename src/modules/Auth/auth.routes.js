import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validationCoreFunction } from "../../middlewares/validation.js";
import * as authValSchema from "./auth.validationSchemas.js";
const router = Router();

router.post(
	"/signup",
	validationCoreFunction(authValSchema.signUpSchema),
	authController.signUp
);

router.post(
	"/login",
	validationCoreFunction(authValSchema.logInSchema),
	authController.logIn
);


export default router