const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = 3000;
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);

app.get("/", (_, res) => {
  res.send("Hello world");
});
