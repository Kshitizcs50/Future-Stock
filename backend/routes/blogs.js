const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new blog
router.post("/", async (req, res) => {
  try {
    const { title, category, description, image } = req.body;
    const newBlog = new Blog({
      title,
      category,
      description,
      image,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
