const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.route("/create").post(createTask);
router.route("/getall").get(getAllTasks);
router.route("/update/:taskId").put(updateTask);
router.route("/delete/:taskId").delete(deleteTask);


module.exports = router;
