const User = require( "../models/userSchema");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");


exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }
  //check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  //creating a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //generating token for cookie
  const token = user.getJwtToken();

  user.password = undefined;



  res.status(200).json({
    success: true,
    message: "Succesfully Registered ",
    token,
    user,   
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }
  // finding user from database uisng email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }
  // comparing password
  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Succesfully LogedIn ",
      token,
      user,
    });
  }

  throw new CustomError("Invalid credentials - pass", 400);
});


exports.logout = asyncHandler(async (_req, res) => {
  
  res.status(200).json({
    success: true,
    message: "Succesfully Logged Out",
  });
});
