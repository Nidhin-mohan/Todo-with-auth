const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.route("/").get((req, res) => {
  res.json({ message: "hi" });
});
router.route("/create").post(isLoggedIn, createTask);
router.route("/getall").get(isLoggedIn, getAllTasks);
router.route("/update/:taskId").put(isLoggedIn, updateTask);
router.route("/delete/:taskId").delete(isLoggedIn, deleteTask);


module.exports = router;
