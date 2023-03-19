const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const { createTask, getAllTasks, updateTask, deleteTask, getTaskCounts } = require("../controllers/taskController");


router.route("/create").post(isLoggedIn, createTask);
router.route("/getall").get(isLoggedIn, getAllTasks);
router.route("/getcount").get(isLoggedIn, getTaskCounts);
router.route("/update/:taskId").put(isLoggedIn, updateTask);
router.route("/delete/:taskId").delete(isLoggedIn, deleteTask);


module.exports = router;
