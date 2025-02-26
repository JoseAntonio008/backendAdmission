const express = require('express');
const { submit } = require('../services/studentProfiling.service');
const studentProfilerRouter = express.Router();



studentProfilerRouter.post('/submitProfiling', async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) throw new Error("Request body is empty");
  
      const results = await submit(body);
  
      if (results.message !== "success") {
        return res.status(400).json({ message: "error", error: results.error });
      }
  
      return res.status(200).json({ message: "success", data: results.data });
  
    } catch (error) {
      console.error("Error in /submitProfiling route:", error.message);
      return res.status(500).json({ message: "error occurred", error: error.message });
    }
  });
  

module.exports = studentProfilerRouter