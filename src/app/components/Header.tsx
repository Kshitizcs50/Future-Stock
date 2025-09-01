"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* ✅ Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">Future Stock</Link>
        </h1>

        {/* ✅ Navigation */}
        <nav className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
