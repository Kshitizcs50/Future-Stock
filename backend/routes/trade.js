const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/trade", authMiddleware, (req, res) => {
  res.json({ message: "✅ You can trade now", user: req.user });
});

module.exports = router;
