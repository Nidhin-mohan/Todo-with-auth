const Task = require("../models/taskSchema");
const User = require("../models/userSchema");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");


//create task
exports.createTask = asyncHandler(async (req, res) => {
  const { title, priority } = req.body;

  // Check if all required fields are present in the request body
  if (!title || !priority) {
    throw new CustomError("All fields required", 400);
  }

  // Check if a task with the same title already exists in the database
  const existingtask = await Task.findOne({ title });

  if (existingtask) {
    throw new CustomError("Task already exists", 400);
  }

  // Create a new task document in the database with user info
  const task = await Task.create({
    title,
    priority,
    user: req.user._id, // add the user ID to the task document
  });

  // Send a response with the newly created task document
  res.status(200).json({
    success: true,
    message: "Succesfully Task Created",
    task,
  });
});
// Get all tasks sorted by status and priority for current user
exports.getAllTasks = asyncHandler(async (req, res) => {
  // Find all tasks in the database that belong to the current user and sort by status and priority
  const tasks = await Task.find({ user: req.user._id }).sort({
    status: -1,
    priority: 1,
  });

  // Send a response with the tasks
  res.status(200).json({
    success: true,
    message: "Successfully fetched all tasks for current user",
    tasks,
  });
});


//update task
exports.updateTask = asyncHandler(async (req, res) => {
  // Extract taskId and status from the request parameters and body
  const { taskId } = req.params;
  const { status } = req.body;

  // Find the task with the given taskId and update its status
  const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

  // Check if the task exists and return an error if not
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  // Send a response with the updated task
  res.status(200).json({
    success: true,
    message: "Successfully updated task status",
    task,
  });
});

// Delete a task
exports.deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id; // Get the ID of the user who deleted the task

  // Find and delete task by ID
  const task = await Task.findByIdAndDelete(taskId);

  // Check if the task exists and return an error if not
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  // Increment the tasksDeleted field of the user who deleted the task
  const user = await User.findById(userId);
  await user.incrementTasksDeleted();

  // Return success response
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});


// Get counts of different types of tasks
exports.getTaskCounts = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the ID of the user
  const counts = {
    pending: 0,
    canceled: 0,
    deleted: 0,
    completed: 0,
  };

  // Count pending tasks
  counts.pending = await Task.countDocuments({
    user: userId,
    status: "pending",
  });

  // Count canceled tasks
  counts.canceled = await Task.countDocuments({
    user: userId,
    status: "canceled",
  });
  // Count deleted tasks
  const { tasksDeleted } = await User.findById(userId).select(
    "tasksDeleted -_id"
  );
  counts.deleted = tasksDeleted;

  // Count completed tasks
  counts.completed = await Task.countDocuments({
    user: userId,
    status: "completed",
  });

  // Return the counts in the response
  res.status(200).json({
    success: true,
    counts,
  });
});


