const express = require("express");
const {
  fetchTotalApplicants,
  fetchTotalSchedules,
} = require("../services/dashboard.service");
const { authMiddleware } = require("../middleware/authmiddleware");
const dashboardRouter = express.Router();

dashboardRouter.get("/totalApplicants", authMiddleware, async (req, res) => {
  try {
    const result = await fetchTotalApplicants();
    if (!result.data) {
      return res.status(200).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occured", error: error.message });
  }
});
dashboardRouter.get("/totalSchedules", authMiddleware, async (req, res) => {
  try {
    const result = await fetchTotalSchedules();
    if (!result.data) {
      return res.status(200).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occured", error: error.message });
  }
});

module.exports = dashboardRouter;
