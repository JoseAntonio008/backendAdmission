const express = require("express");
const uploadRouter = require("./services/uploadRoute");
require("dotenv").config(); // Load environment variables
const cors = require("cors");

const { sequelize } = require("./models");
const studentProfilerRouter = require("./controllers/studentProfiling.controller");
const adminRouter = require("./controllers/admin.controller");
const dashboardRouter = require("./controllers/dashboard.controller");
const scheduleRouter = require("./controllers/schedule.controller");
const quizRouter = require("./controllers/quiz.controller");
const admissionRouter = require("./controllers/admission.controller");
const app = express();
const port = 5000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// Routes

app.use;
app.use("/api/student", studentProfilerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api", uploadRouter);
app.use("/api/questions", quizRouter);
app.use('/api/admission',admissionRouter)
// Start server

app.listen(port, async () => {
  try {
    console.log(`Server running on PORT: ${port}`);
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error.message);
  }
});
