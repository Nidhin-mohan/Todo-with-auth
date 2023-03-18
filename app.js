const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//morgan logger
app.use(morgan("tiny"));

//import all routes
const user = require("./routes/userRoute");
const task = require("./routes/taskRoute");


// // Define a route for the home page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Define a route for the login page
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "login.html"));
// });

// // Define a route for the login page
// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "register.html"));
// });

// // Define a route for the login page
// app.get("/task", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "task.html"));
// });



//router middleware
app.use("/api/v1/auth", user);
app.use("/api/v1/task", task);
//  app.get("/api/v1/task/create", (req, res) => {
//    res.json({ message: "hello" });
//  });


//  "not found" route
app.use((req, res, next) => {
  res.status(404).send('Sorry, the page you requested could not be found.');
});



module.exports = app;
