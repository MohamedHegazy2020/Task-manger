import { compareSync } from "bcrypt";
import { userModel } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorhandling.js";
import { generateToken } from "../../../utils/tokenFunctions.js";

// ====================== sign up =============================

export const signUp = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  // ------------- check if user exist------------
  const isEmailDuplicate = await userModel.findOne({ email });
  if (isEmailDuplicate) {
    return next(new Error("email is already exist", { cause: 400 }));
  }

// ------------- check if user exist------------
const isUserNameDuplicate = await userModel.findOne({ userName });
if (isUserNameDuplicate) {
  return next(new Error("userName is already exist", { cause: 400 }));
}




  const user = await userModel({
    userName,
    email,
    password,
  });
  const savedUser = await user.save();

  return res.status(201).json({ message: "Done", user: savedUser });
});
// ============================ log in ============================

export const logIn = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  console.log('login');
  const user = await userModel.findOne({ userName });
  if (!user) {
    return next(new Error("invalid userName", { cause: 400 }));
  }

  const isPassMatch = compareSync(password, user.password);

  if (!isPassMatch) {
    return next(new Error("invalid password", { cause: 400 }));
  }

  const token = generateToken({
    payload: {
      userName,
      _id: user._id,
      role: user.role,
    },
    signature: process.env.SIGN_IN_TOKEN_SECRET,
    expiresIn: "1h",
  });

  const loggedUser = await userModel.findByIdAndUpdate(
    user._id,
    {
      token,
    },
    { new: true }
  );

  return res.status(200).json({ message: "Login Done", loggedUser });
});
