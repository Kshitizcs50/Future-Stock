"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Unlisted Shares", href: "/unlistedshares" },
    { name: "News", href: "/news" },
    { name: "Blogs", href: "/blogs" },
    { name: "Partner", href: "/partner" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md transition-colors duration-300 
        ${isOpen ? "bg-white" : "bg-white/80"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 shadow-lg">
            <span className="text-white font-bold text-lg">FS</span>
          </div>
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text font-serif">
            FutureStock
          </span>
        </motion.div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={item.href}
                className="hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Search + Contact */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stocks..."
              className="border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none transition"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition"
          >
            <Phone size={18} />
            <span>Contact Us</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
     {/* Mobile Menu Drawer */}
{isOpen && (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "tween", duration: 0.3 }}
    className="md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col p-6 gap-6 z-50"
  >
    {/* Close Header */}
    <div className="flex justify-between items-center mb-6">
      <span className="text-xl font-bold text-green-600">Menu</span>
      <X
        size={28}
        className="cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
    </div>

    {/* Links */}
    {navItems.map((item, idx) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <Link
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="block py-2 text-lg text-gray-700 hover:text-green-600 transition"
        >
          {item.name}
        </Link>
      </motion.div>
    ))}

    {/* Search & Contact */}
    <div className="mt-auto flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search stocks..."
          className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none transition"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition"
      >
        <Phone size={18} />
        <span>Contact Us</span>
      </motion.button>
    </div>
  </motion.div>
)}

         
    </header>
  );
}
