const express = require("express");
const uploadRouter = require("./services/uploadRoute");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const { sequelize } = require("./models");
const studentProfilerRouter = require("./controllers/studentProfiling.controller");
const app = express();
const port = 4000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// Routes
app.use("/api", uploadRouter);
app.use("/api",studentProfilerRouter)
// Start server
app.listen(port, async () => {
  try {
    console.log(`Server running on PORT: ${port}`);
    await sequelize.sync();  
  } catch (error) {
    console.log(error.message);
    
  }
  
});
