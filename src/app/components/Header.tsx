"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-4 shadow bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold text-2xl">UV</span>
        <span className="font-semibold text-lg">Unlisted Valley</span>
      </div>

      {/* Navbar */}
      <nav className="flex gap-6 text-gray-700 font-medium">
        <Link href="/">Home</Link>
        <Link href="/shares">Unlisted Shares</Link>
        <Link href="/news">News</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/partner">Partner with Us</Link>
      </nav>

      {/* Search + Button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search stocks..."
          className="border rounded-full px-4 py-1"
        />
        <button className="bg-black text-white px-4 py-2 rounded-full">
          Contact Us
        </button>
      </div>
    </header>
  );
}
