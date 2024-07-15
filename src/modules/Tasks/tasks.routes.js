import { Router } from "express";
import { isAuth } from "../../middlewares/auth.js";
import { validationCoreFunction } from "../../middlewares/validation.js";
import * as taskValidationSchemas from "./tasks.validationSchemas.js";
import * as taskController from "./tasks.controller.js";

const router = Router();

router.post(
  "/",
  isAuth(),
  validationCoreFunction(taskValidationSchemas.createTaskSchema),
  taskController.createTask
);

router.get(
  "/getAllPublicTasks",
  validationCoreFunction(taskValidationSchemas.getTasksSchema),
  taskController.getAllPublicTasks
);
router.get(
  "/getAllPrivateTasks",
  isAuth(),
  validationCoreFunction(taskValidationSchemas.getTasksSchema),
  taskController.getAllPrivateTasks
);

router.put(
  "/:taskId",
  isAuth(),
  validationCoreFunction(taskValidationSchemas.updateTaskSchema),
  taskController.updateTask
);
router.delete(
  "/:taskId",
  isAuth(),
  validationCoreFunction(taskValidationSchemas.deleteTaskSchema),
  taskController.deleteTask
);
export default router;
