const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all requests
app.use(express.json());
app.use("/api/tasks", taskRoutes);

const PORT = 3000;
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
