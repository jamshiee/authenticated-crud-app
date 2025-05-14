import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  
  if (!token) {
    return res.status(401).json({
      message: "Authentication failed - No Token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId); 
    console.log("Token verified");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
