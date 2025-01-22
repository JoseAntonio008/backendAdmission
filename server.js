const express = require("express");
const uploadRouter = require("./services/uploadRoute");
require("dotenv").config(); // Load environment variables

const app = express();
const port = 4000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", uploadRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
