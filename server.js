const express = require("express");
const uploadRouter = require("./services/uploadRoute");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const port = 4000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// Routes
app.use("/api", uploadRouter);

// Start server
app.listen(port, async () => {
  try {
    console.log(`Server running on PORT: ${port}`);
    // { alter: true }
    // { force: true }
    const connection = await sequelize.sync();

    return "connection Established";
  } catch (error) {
    console.error(error);
  }
});
