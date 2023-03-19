// Import required packages
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const config = require("../config");

// Create user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password must be atleast 6 character"],
    },
    tasksDeleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add more methods to the schema
userSchema.methods = {
  // Compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // Generate JWT token
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        name: this.name,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },

  // Increment tasksDeleted field when a task is deleted
  incrementTasksDeleted: async function () {
    this.tasksDeleted += 1;
    await this.save();
  },
};

// Export the user model
module.exports = mongoose.model("User", userSchema);
