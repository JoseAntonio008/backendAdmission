const express = require("express");
const {  fetchSchedule } = require('../services/schedule.service');
const { submit, fetchNew, approveNew, archivedNew, fetchTransferee, archivedTransferee, approveTransferee, approveSecond, fetchSecond, archivedSecond, fetchReturning, fetchAdmission, changeSchedule, archivedAdmission } = require("../services/studentProfiling.service");
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
    const schedule = await fetchSchedule();
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
      availableSlots:schedule.data
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error.message,
    });
  }
});
studentProfilerRouter.get("/fetchTransferee", authMiddleware, async (req, res) => {
  try {
    const response = await fetchTransferee();
    console.log(response);
    const schedule = await fetchSchedule();
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
      availableSlots:schedule.data
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error.message,
    });
  }
});
studentProfilerRouter.get("/fetchSecond", authMiddleware, async (req, res) => {
  try {
    const response = await fetchSecond();
    console.log(response);
    const schedule = await fetchSchedule();
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
      availableSlots:schedule.data
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error.message,
    });
  }
});
studentProfilerRouter.get("/fetchReturning", authMiddleware, async (req, res) => {
  try {
    const response = await fetchReturning();
    console.log(response);
    const schedule = await fetchSchedule();
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
      availableSlots:schedule.data
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error,
    });
  }
});
studentProfilerRouter.get("/fetchAdmission", authMiddleware, async (req, res) => {
  try {
    const response = await fetchAdmission();
    console.log(response);
    const schedule = await fetchSchedule();
    
    if (!response.data) {
      return res.status(200).json({
        message:response.message
      })
    }
    return res.status(200).json({
      message: "fetch successfully",
      data: response.data,
      availableSlots:schedule.data
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error: error,
    });
  }
});

studentProfilerRouter.post('/changeSchedule',async (req,res) => {
  try {
    const { body} = req
    const response = await changeSchedule(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/archive-admission',async (req,res) => {
  try {
    const { body} = req
    const response = await archivedAdmission(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})

studentProfilerRouter.post('/approve-new',async (req,res) => {
  try {
    const { body} = req
    const response = await approveNew(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/approve-transferee',async (req,res) => {
  try {
    const { body} = req
    const response = await approveTransferee(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/archive-new',async (req,res) => {
  try {
    const { body} = req
    const response = await archivedNew(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/archive-transferee',async (req,res) => {
  try {
    const { body} = req
    const response = await archivedTransferee(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/approve-second',async (req,res) => {
  try {
    const { body} = req
    const response = await approveSecond(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
studentProfilerRouter.post('/archive-second',async (req,res) => {
  try {
    const { body} = req
    const response = await archivedSecondee(body)
    if (response.message != "success") throw new Error(response.error);
    return res.status(200).json({message:response.message})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
module.exports = studentProfilerRouter;
