const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "General" },
    description: { type: String, required: true },
    image: { type: String, default: "/images/default.jpg" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
