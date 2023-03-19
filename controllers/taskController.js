const Task = require("../models/taskSchema");
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

  // Find and delete task by ID
  const task = await Task.findByIdAndDelete(taskId);

  // Check if the task exists and return an error if not
  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  // Return success response
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

