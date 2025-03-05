const { getToken, verifyToken } = require("../helpers/utils");
const { Admin} = require('../models')



const authMiddleware = async (req, res, next) => {
    try {
      // Extract token from authorization header
      const token = getToken(req.headers.authorization);
      
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }
  
      // Verify the token
      const user = verifyToken(token);
      
      const checkToken = await Admin.findByPk(user.userID);
      if (token != checkToken.token) {
        return res.status(403).json({message:"Invalid token"})
      }
      
      if (!user) {
        return res.status(403).json({ message: "Invalid token" });
      }
  
      // Attach user information to the request object
      req.user = user;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res
        .status(500)
        .json({ message: "Authentication error", error: error.message });
    }
  };

  module.exports = {
    authMiddleware
  }