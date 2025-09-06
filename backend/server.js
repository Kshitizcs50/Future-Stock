const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stockRoutes = require("./routes/stocks");
const blogRoutes = require("./routes/blogs"); // ← Import blog routes

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
