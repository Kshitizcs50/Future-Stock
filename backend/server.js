const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stockRoutes = require("./routes/stocks");
const blogRoutes = require("./routes/blogs"); // ← Import blog routes
const authRoutes = require("./routes/auth"); // ← Import auth routes
const tradeRoutes = require("./routes/trade");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/blogs", blogRoutes); // ← Add blog routes
app.use("/api/auth", authRoutes); 
app.use("/api", tradeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
