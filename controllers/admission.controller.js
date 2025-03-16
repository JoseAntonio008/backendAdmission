const express = require('express');
const { loginAdmission } = require('../services/admission.service');
const admissionRouter = express.Router();


admissionRouter.post('/login',async (req,res) => {
    try {
        const { body} = req
        const result = await loginAdmission(body)
        console.log(result);
        
        if(result.message != "success login") throw new Error(result.error);
        return res.status(200).json({
            message:"login successful",
            token:result.token
        })
    } catch (error) {
        return res.status(500).json({
            message:"An error occured",
            error:error.message
        })
    }
})

module.exports = admissionRouter