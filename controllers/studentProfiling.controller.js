const express = require('express');
const { submit } = require('../services/studentProfiling.service');
const studentProfilerRouter = express.Router();



studentProfilerRouter.post('/submitProfiling', async (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) throw new Error("empty body");

        const results = await submit(body);
        if (!results || results.message !== "success") throw new Error(results?.message || "Unknown error");

        return res.status(200).json({
            message: "success",
            data: body
        });

    } catch (error) {
        
        return res.status(500).json({
            message: "error occurred",
            error: error.message  // Only return error message, not the full error object
        });
    }
});


module.exports = studentProfilerRouter