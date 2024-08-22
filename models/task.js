const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: String,
  },
  { timestamps: true } // feature in Mongoose that automatically adds createdAt and updatedAt fields to your schema
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
