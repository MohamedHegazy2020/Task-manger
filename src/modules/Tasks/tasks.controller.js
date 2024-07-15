import { categoryModel } from "../../../DB/models/category.model.js";
import {
  listTaskModel,
  taskModel,
  textTaskModel,
} from "../../../DB/models/task.model.js";
import { apiFeature } from "../../../utils/apiFeatures.js";
import { asyncHandler } from "../../../utils/errorhandling.js";

export const createTask = asyncHandler(async (req, res, next) => {
  const { type, categoryId, shared, body } = req.body;

  const isCategoryExist = await categoryModel.findById(categoryId);
  if (!isCategoryExist) {
    return next(new Error("category doesn't exist"));
  }

  if (type == "text") {
    const task = await textTaskModel.create({
      type,
      categoryId,
      shared,
      body,
      createdBy: req.authUser._id,
    });
    return res.status(201).json({ message: "Done", task });
  } else {
    const task = await listTaskModel.create({
      type,
      categoryId,
      shared,
      body,
      createdBy: req.authUser._id,
    });
    return res.status(201).json({ message: "Done", task });
  }
});

// ==================== get all tasks =====================
export const getAllPublicTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel
    .find({ shared: "public" })
    .populate("categoryId");
  const featuredData = apiFeature(tasks, req.query);
  return res.status(200).json({
    message: "Done",
    tasks: featuredData,
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  });
});

export const getAllPrivateTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel
    .find({ shared: "private", createdBy: req.authUser._id })
    .populate("categoryId");
  const featuredData = apiFeature(tasks, req.query);
  return res.status(200).json({
    message: "Done",
    tasks: featuredData,
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await taskModel.findOne({
    createdBy: req.authUser._id,
    _id: taskId,
  });
  if (!task) {
    return next(new Error("task doesn't exist"));
  }

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      task[key] = req.body[key]; // Update the field in the Mongoose object
    }
  }

  await task.save();
  return res.status(200).json({ message: "Done", updatedTask: task });
});


export const deleteTask = asyncHandler(async(req,res,next)=>{
  const { taskId } = req.params;
  const task = await taskModel.findOne({
    createdBy: req.authUser._id,
    _id: taskId,
  });
  if (!task) {
    return next(new Error("task doesn't exist"));
  }


  const deleteResult =    await task.deleteOne()
  return res.status(200).json({message:'Done' ,deleteResult})

})