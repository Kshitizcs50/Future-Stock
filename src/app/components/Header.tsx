// src/app/components/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Menu, X } from "lucide-react";

/**
 * Animated, accessible header with an enhanced search UX:
 * - Desktop: expanding inline search with type-ahead suggestions
 * - Mobile: full-screen modal search
 * - Debounce + keyboard navigation + logos via Clearbit + fallback avatar
 */

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
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [searchOpen, setSearchOpen] = useState(false); // desktop expanded state
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // mobile modal
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof STOCKS>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      // simple ranking: startsWith first, then includes
      const starts = STOCKS.filter((s) =>
        s.name.toLowerCase().startsWith(q)
      );
      const contains = STOCKS.filter(
        (s) => !s.name.toLowerCase().startsWith(q) && s.name.toLowerCase().includes(q)
      );
      const result = [...starts, ...contains].slice(0, 6);
      setSuggestions(result);
      setActiveIndex(result.length ? 0 : -1);
      setLoading(false);
    }, 220); // debounce 220ms
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

  // keyboard navigation for desktop inline search
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
    // navigate to a search results page (example route)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setQuery("");
  }

  function navigateToStock(name: string) {
    // simple slugify and route - replace with your actual route
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/stock/${encodeURIComponent(slug)}`);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setQuery("");
    setSuggestions([]);
  }

  function getLogo(domain: string) {
    // Clearbit logo, size param helps smaller images
    return `https://logo.clearbit.com/${domain}?size=64`;
  }

  // highlight matched substring
  function highlight(name: string) {
    if (!query) return <>{name}</>;
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${q})`, "ig");
    const parts = name.split(re);
    return (
      <>
        {parts.map((part, idx) =>
          re.test(part) ? (
            <mark key={idx} className="bg-amber-200/70 px-0.5 rounded">
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
      <header className="fixed top-0 left-0 w-full z-50  bg-gray-300/40 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* left: logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow">
                  FS
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-extrabold text-slate-900">FutureStock</div>
                  <div className="text-xs text-slate-500">Unlisted Opportunities</div>
                </div>
              </Link>
            </div>

            {/* center: nav (desktop) */}
            <nav className="hidden md:flex gap-8 items-center text-slate-700 font-medium">
              <Link href="/" className="hover:text-sky-600 transition">Home</Link>
              <Link href="/UnlistedSharesTable" className="hover:text-sky-600 transition">Unlisted Shares</Link>
              <Link href="/Newslatest" className="hover:text-sky-600 transition">News</Link>
              <Link href="/blogs" className="hover:text-sky-600 transition">Blogs</Link>
            </nav>

            {/* right: search + contact */}
            <div className="flex items-center gap-3">
              {/* Desktop expanding search */}
              <div ref={containerRef} className="hidden md:flex items-center gap-2">
                <motion.div
  initial={{ width: 44 }}
  animate={{ width: searchOpen ? 360 : 44 }}
  transition={{ type: "spring", stiffness: 300, damping: 28 }}
  className="relative flex items-center origin-right"
>
  {/* collapsed button */}
  {!searchOpen && (
    <button
      aria-label="Open search"
      onClick={() => {
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 120);
      }}
      className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition"
    >
      <Search size={19} className="text-slate-600" />
    </button>
  )}

  {/* expanded input */}
  <AnimatePresence>
    {searchOpen && (
      <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-2 w-[360px] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50"
                >
        <div className="w-[360px]">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-2 shadow-sm">
            <Search size={16} className="text-slate-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search companies, e.g. TATA Capital"
              className="flex-1 text-sm outline-none"
            />
            <button
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setSearchOpen(false);
              }}
              className="p-1 rounded-full hover:bg-slate-100"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.ul>
    )}
  </AnimatePresence>
</motion.div>

              </div>

              {/* Mobile search icon (opens full-screen modal) */}
              <button
                className="md:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <Search size={18} />
              </button>

              {/* Contact button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-sky-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow"
              >
                <Phone size={16} />
                <span className="text-sm">Contact</span>
              </motion.button>

              {/* mobile drawer button */}
              <button className="md:hidden" onClick={() => setDrawerOpen((d) => !d)} aria-label="Open menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer (simple full-height drawer) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="font-bold text-lg">Menu</div>
                <button onClick={() => setDrawerOpen(false)}>
                  <X />
                </button>
              </div>
              <nav className="flex flex-col gap-3">
                <Link href="/" onClick={() => setDrawerOpen(false)} className="py-2">Home</Link>
                <Link href="/UnlistedSharesTable" onClick={() => setDrawerOpen(false)} className="py-2">Unlisted Shares</Link>
                <Link href="/Newslatest" onClick={() => setDrawerOpen(false)} className="py-2">News</Link>
                <Link href="/blogs" onClick={() => setDrawerOpen(false)} className="py-2">Blogs</Link>
                <Link href="/partner" onClick={() => setDrawerOpen(false)} className="py-2">Partner</Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile full-screen search modal */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileSearchOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2 flex-1">
                  <Search size={18} className="text-slate-500" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitSearch(query);
                    }}
                    className="bg-transparent outline-none text-sm w-full"
                    placeholder="Search companies, e.g. TATA Capital"
                  />
                </div>

                <button onClick={() => setMobileSearchOpen(false)} aria-label="close">
                  <X />
                </button>
              </div>

              {/* suggestions for mobile */}
              <div className="mt-4 max-h-56 overflow-auto">
                {suggestions.map((s, i) => {
                  const logo = getLogo(s.domain);
                  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    s.name
                  )}&background=random&color=fff&size=64`;
                  return (
                    <button
                      key={s.name}
                      onClick={() => navigateToStock(s.name)}
                      className="w-full text-left flex items-center gap-3 p-3 rounded hover:bg-slate-50"
                    >
                      <img
                        src={logo}
                        alt={`${s.name} logo`}
                        className="w-10 h-10 rounded-full object-contain ring-1 ring-slate-100 bg-white"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.onerror = null;
                          t.src = fallback;
                        }}
                      />
                      <div>
                        <div className="font-semibold text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.domain}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* spacer so page content below header isn't hidden */}
      <div className="h-16" />
    </>
  );
}
