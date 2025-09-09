import connectDB from "../backend/utils/db";
import Blog from "../backend/models/Blog";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, category, description, image } = req.body;
      const newBlog = new Blog({ title, category, description, image });
      await newBlog.save();
      return res.status(201).json(newBlog);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
