const express = require("express");
const { login, createAccount } = require("../services/user.service");

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0)
        throw new Error("Request body is empty");
    const response = await login(body);
    console.log(response);
    
    if (response.message == "An error occured") throw new Error(response.error);
    if (response.token) {
        // console.log(`here: token`);
        
      return res.status(200).json({
        message: response.message,
        token:response.token,
      });
    }
    return res.status(200).json({
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
        message:"An error occured",
        error:error.error
    })
  }
});

adminRouter.post('/register',async (req,res) => {
    try {
        const { body } = req
        if (!body || Object.keys(body).length === 0)
            throw new Error("Request body is empty");
        const response = await createAccount(body)
        if(response.message == "An error occured") throw new Error(response.error);
        console.log(response)
        
        return res.status(200).json({message:response.message})
    } catch (error) {
        return res.status(500).json({message:"An error occured",error:error.message})
    }
})

module.exports = adminRouter