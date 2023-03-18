const mongoose = require("mongoose");
const app = require("./app.js");
require("dotenv").config();

(async () => {
  try {
    // Connecting to MongoDB Atlas using the URL from the .env file
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");

    // Error handling for the app
    app.on("error", (err) => {
      console.log("Error :", err);
      throw err;
    });

    // Function to log the port where the app is listening to incoming requests
    const onListening = () => {
      console.log(`Listening on ${process.env.PORT}`);
    };

    // Starting the server and logging the port where the app is listening
    app.listen(process.env.PORT, onListening);
  } catch (err) {
    console.log("ERROR ", err);
    throw err;
  }
})();
