const express = require("express");
const { submit, fetchNew } = require("../services/studentProfiling.service");
const { authMiddleware } = require("../middleware/authmiddleware");
const studentProfilerRouter = express.Router();

studentProfilerRouter.post("/submitProfiling", async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0)
      throw new Error("Request body is empty");

    const results = await submit(body);

    if (results.error) {
      console.log("error here");

      console.log(results.error);
    }
    if (results.message !== "success") {
      return res.status(400).json({ message: "error", error: results.error });
    }
    // console.log(results);

    return res.status(200).json({ message: "success", data: results.data });
  } catch (error) {
    console.error("Error in /submitProfiling route:", error.message);
    return res
      .status(500)
      .json({ message: "error occurred", error: error.message });
  }
});
studentProfilerRouter.get("/fetchNew", authMiddleware, async (req, res) => {
  try {
    const response = await fetchNew();
    console.log(response);
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error.message,
    });
  }
});
module.exports = studentProfilerRouter;
