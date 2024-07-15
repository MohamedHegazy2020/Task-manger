import mongoose from "mongoose";

// Define a common Task schema
const taskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["text", "list"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    shared: { type: String, required: true, enum: ["public", "private"] },
  },
  { timestamps: true,discriminatorKey: "type", toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// Define discriminators for TextTask and ListTask models based on the Task schema

export const taskModel =
  mongoose.model("Task", taskSchema) || mongoose.models("Task");

// Create TextTask model using discriminator




export const textTaskModel =taskModel.discriminator('text',{body:{type:String ,required:true}})
export const listTaskModel =taskModel.discriminator('list',{body:[{type:String ,required:true}]})

// Usage
