const express = require("express");
const app = express();

// Set up middleware to parse JSON requests
app.use(express.json());

// Define a route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the Todo app!");
});

// Define a route for creating a new task
app.post("/tasks", (req, res) => {
  // Add code to create a new task here
  res.send("Task created successfully");
});

// Define a route for listing all tasks
app.get("/tasks", (req, res) => {
  // Add code to list all tasks here
  res.send("List of tasks");
});

module.exports = app;
