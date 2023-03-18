const User = require("../models/user.schema.js");
const JWT = require("jsonwebtoken");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");

exports.isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Not authorized to access this route", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    //_id, find user based on id, set this in req.user

    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
});

