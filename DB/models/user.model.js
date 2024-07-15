import { hashSync } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token:String
  },
  { timestamps: true }
);
userSchema.pre("save", function (next, hash) {
	// console.log(this.password);
	this.password = hashSync(this.password, +process.env.SALT_ROUNDS);
	// console.log(this.password);

	next();
});

export const userModel =
  mongoose.model("User", userSchema) || mongoose.models("User");
