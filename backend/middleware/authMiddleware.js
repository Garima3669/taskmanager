import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    console.log("========== AUTH MIDDLEWARE ==========");
    console.log("Headers:", req.headers);
    console.log("Authorization:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    console.log("User:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export default protect;