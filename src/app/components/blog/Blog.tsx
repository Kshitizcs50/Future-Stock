"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "What Are Unlisted Shares? A Beginner’s Guide",
      category: "Guide",
      description:
        "Your complete introduction to the world of unlisted equities.",
      image: "/images/blog1.jpg",
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  // Add Blog Handler
  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.description) return;
    setBlogs([
      ...blogs,
      {
        id: blogs.length + 1,
        ...newBlog,
        image: newBlog.image || "/images/default.jpg",
      },
    ]);
    setNewBlog({ title: "", category: "", description: "", image: "" });
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">Our Blog</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Insights, thoughts, and perspectives on topics that matter.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex flex-col">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full mb-3">
                  {blog.category || "General"}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Blog Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            ✍️ Write Your Own Blog
          </h3>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Blog Description"
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newBlog.image}
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddBlog}
              className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              🚀 Publish Blog
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
