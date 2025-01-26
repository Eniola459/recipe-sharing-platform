const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); 

/**
 * Middleware to authenticate users using JWT
 * - If a valid token is present, the user is attached to the request object.
 * - If no token or an invalid token is provided, the request will return a 401 Unauthorized error.
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token, respond with Unauthorized error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required"
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment variables

    // Find the user by the ID stored in the decoded token
    const user = await User.findById(decoded.userId);

    // If no user is found, respond with Unauthorized error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or invalid token"
      });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, log the error and respond with Unauthorized error
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authenticateUser;
