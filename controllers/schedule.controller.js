const express = require("express");
const {
  createSchedule,
  fetchSchedule,
} = require("../services/schedule.service");
const { authMiddleware } = require("../middleware/authmiddleware");
const scheduleRouter = express.Router();

scheduleRouter.post("/create-sched", async (req, res) => {
  try {
    const { body } = req;

    const response = await createSchedule(body);
    console.log(`schedule response :`, response);
    if (response.message != "success") {
      throw new Error(response.error);
    }
    return res
      .status(200)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an Error occured", error: error.message });
  }
});

scheduleRouter.get("/fetch-sched", async (req, res) => {
  try {
    const response = await fetchSchedule();
    if (response.message != "fetch successfully")
      throw new Error(response.error);
    return res.status(200).json({ message: "success", data: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occured", error: error.message });
  }
});

module.exports = scheduleRouter;
