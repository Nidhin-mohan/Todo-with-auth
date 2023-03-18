const express = require("express");
const morgan = require("morgan");

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan logger
app.use(morgan("tiny"));

//import all routes
const user = require("./routes/userRoute");


// Define a route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the Todo app!");
});

//router middleware
app.use("/api/v1/auth", user);


//  "not found" route
app.use((req, res, next) => {
  res.status(404).send('Sorry, the page you requested could not be found.');
});



module.exports = app;
