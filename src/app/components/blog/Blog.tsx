"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BlogType {
  _id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [newBlog, setNewBlog] = useState<BlogType>({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Add new blog to backend
  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.description) return;

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      const data = await res.json();
      setBlogs([data, ...blogs]); // Show new blog on top
      setNewBlog({ title: "", category: "", description: "", image: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            ✨ Our Blog
          </h2>
          <p className="text-gray-300 mt-3 text-lg">
            Insights, thoughts, and perspectives on topics that matter.
          </p>
        </motion.div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="relative rounded-3xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-purple-400 transition"
              >
                {blog.image && (
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <div className="p-6">
                  {blog.category && (
                    <span className="px-4 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4 inline-block">
                      {blog.category}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-3 hover:text-purple-400 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{blog.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg mb-16">
            😎 No blogs yet. Be the first to post!
          </div>
        )}

        {/* Add Blog Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ✍️ Write Your Own Blog
          </h3>
          <div className="grid gap-5">
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="text"
              placeholder="Category"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <motion.textarea
              whileFocus={{ scale: 1.03 }}
              placeholder="Blog Description"
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              rows={4}
            />
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="text"
              placeholder="Image URL (optional)"
              value={newBlog.image}
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #9333ea" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddBlog}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold tracking-wide"
            >
              🚀 Publish Blog
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
