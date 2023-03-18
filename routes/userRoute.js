const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware")
const { signUp, login, logout } = require("../controllers/userController")

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(isLoggedIn, logout);

module.exports = router;