import { Router } from "express";
import { isAuth } from "../../middlewares/auth.js";
import * as categoryController from "./category.controller.js";
import * as categoryValidationSchemas from "./category.validationSchemas.js";
import { validationCoreFunction } from "../../middlewares/validation.js";

const router = Router();

router.post(
  "/",
  isAuth(),
  validationCoreFunction(categoryValidationSchemas.createCategorySchema),
  categoryController.createCategory
);
router.get("/", isAuth(), categoryController.getAllCategories);

router.put(
  "/:categoryId",
  isAuth(),
  validationCoreFunction(categoryValidationSchemas.updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
    "/:categoryId",
    isAuth(),
    validationCoreFunction(categoryValidationSchemas.deleteCategorySchema),
    categoryController.deleteCategory
  );

export default router;
