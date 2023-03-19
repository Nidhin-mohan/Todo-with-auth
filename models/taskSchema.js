const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Task title is required`],
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 9,
    },
    status: {
      type: [String],
      enum: ["pending", "completed", "canceled", "deleted"],
      default: ["pending"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the task model
module.exports = mongoose.model("Task", taskSchema);
