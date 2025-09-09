import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "❌ No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "❌ Invalid or expired token" });
      }

      // Attach user to request for later use
      req.user = user;

      // If inside Express → call next()
      if (typeof next === "function") {
        return next();
      }

      // If inside serverless (no `next`) → just return
      return true;
    });
  } catch (err) {
    console.error("❌ Auth middleware error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
