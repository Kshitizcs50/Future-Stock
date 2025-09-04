// src/app/components/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Menu, X } from "lucide-react";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof STOCKS>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fake auth state (replace later with real auth)
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Debounce & compute suggestions
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

  // close suggestions if click outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) {
      if (e.key === "Enter") submitSearch(query);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = suggestions[activeIndex] ?? null;
      if (selected) navigateToStock(selected.name);
      else submitSearch(query);
    } else if (e.key === "Escape") {
      setSearchOpen(false);
    }
  }

  function submitSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setQuery("");
  }

  function navigateToStock(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/stock/${encodeURIComponent(slug)}`);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setQuery("");
    setSuggestions([]);
  }

  function getLogo(domain: string) {
    return `https://logo.clearbit.com/${domain}?size=64`;
  }

  function highlight(name: string) {
    if (!query) return <>{name}</>;
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${q})`, "ig");
    const parts = name.split(re);
    return (
      <>
        {parts.map((part, idx) =>
          re.test(part) ? (
            <mark
              key={idx}
              className="bg-amber-200/70 px-0.5 rounded"
            >
              {part}
            </mark>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </>
    );
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
              {/* Desktop Search */}
              <div
                ref={containerRef}
                className="hidden md:flex items-center gap-2"
              >
                {/* ... existing expanding search ... */}
              </div>

              {/* Mobile Search */}
              <button
                className="md:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <Search size={18} />
              </button>

              {/* Auth Buttons */}
              {user ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold cursor-pointer shadow">
                  {user.name.charAt(0).toUpperCase()}
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
