const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Connected to DB");
    });
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
