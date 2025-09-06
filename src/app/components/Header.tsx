// src/app/components/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Phone, Menu } from "lucide-react";

const STOCKS = [
  { name: "NSE", domain: "nseindia.com" },
  { name: "TATA Capital", domain: "tatacapital.com" },
  { name: "Nayara Energy", domain: "nayaraenergy.com" },
  { name: "SBI AMC", domain: "sbimf.com" },
  { name: "Capgemini", domain: "capgemini.com" },
  { name: "HDB Financial Services", domain: "hdbfs.com" },
  { name: "Reliance Retail", domain: "ril.com" },
  { name: "Infosys", domain: "infosys.com" },
  { name: "HDFC Bank", domain: "hdfcbank.com" },
  { name: "TCS", domain: "tcs.com" },
];

export default function Header() {
 
  const router = useRouter();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof STOCKS>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auth state
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  // On mount, check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/"); // redirect to home
  }

  // Search logic (unchanged)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const starts = STOCKS.filter((s) => s.name.toLowerCase().startsWith(q));
      const contains = STOCKS.filter(
        (s) =>
          !s.name.toLowerCase().startsWith(q) &&
          s.name.toLowerCase().includes(q)
      );
      const result = [...starts, ...contains].slice(0, 6);
      setSuggestions(result);
      setActiveIndex(result.length ? 0 : -1);
      setLoading(false);
    }, 220);
    return () => clearTimeout(id);
  }, [query]);

  function navigateToStock(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/stock/${encodeURIComponent(slug)}`);
    setQuery("");
    setSuggestions([]);
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-300/40 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow">
                  FS
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-extrabold text-slate-900">
                    FutureStock
                  </div>
                  <div className="text-xs text-slate-500">
                    Unlisted Opportunities
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center text-slate-700 font-medium">
              <Link href="/" className="hover:text-sky-600 transition">
                Home
              </Link>
              <Link
                href="/UnlistedSharesTable"
                className="hover:text-sky-600 transition"
              >
                Unlisted Shares
              </Link>
              <Link
                href="/Newslatest"
                className="hover:text-sky-600 transition"
              >
                News
              </Link>
              <Link href="/Bloog" className="hover:text-sky-600 transition">
                Blogs
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">
                  {( user.email)
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                
                  className="hidden md:flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-full shadow-sm"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="hidden md:flex items-center gap-2 border border-sky-500 text-sky-600 px-4 py-2 rounded-full shadow-sm"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="hidden md:flex items-center gap-2 bg-gradient-to-r from-sky-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow"
                  >
                    Signup
                  </motion.button>
                </Link>
              </>
              )}

              {/* Contact */}
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-sky-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow"
                >
                  <Phone size={16} />
                  <span className="text-sm">Contact</span>
                </motion.button>
              </Link>

              {/* Mobile Menu */}
              <button
                className="md:hidden"
                onClick={() => setDrawerOpen((d) => !d)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
