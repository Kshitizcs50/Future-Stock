import connectDB from "../backend/utils/db";
import Blog from "../backend/models/Blog";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const blogs = await Blog.find();
      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      return res.status(201).json(blog);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
