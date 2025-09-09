"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Stock {
  _id: string;
  name: string;
  price: string;
  marketCap: string;
  change: string;
  logo: string;
}

const ITEMS_PER_PAGE = 5;

export default function UnlistedSharesTable() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // ✅ Fetch stocks from backend
  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("/api/stock");
        if (!res.ok) throw new Error("Failed to fetch stocks");

        const data: Stock[] = await res.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-300 text-lg">
        Loading stocks...
      </p>
    );
  }

  // ✅ Filtering
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredStocks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // ✅ Protected navigation for Trade Now
  const handleTradeNow = async (stockName: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → go to signup
    router.push("/signup");
    return;
  }

  try {
    // Verify token with backend
    const res = await fetch("http://localhost:5000/api/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      // Invalid/expired token → clear and redirect
      localStorage.removeItem("token");
      router.push("/signup");
      return;
    }

    // ✅ Valid token → allow navigation
    router.push(`/trade/${encodeURIComponent(stockName)}`);
  } catch (error) {
    console.error("Auth check failed:", error);
    localStorage.removeItem("token");
    router.push("/signup");
  }
};

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-300 drop-shadow-[0_0_6px_#22c55e]">
        📊 Unlisted Shares
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-md px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all duration-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl border border-white/20">
        <table className="w-full text-left border-collapse text-white">
          <thead className="bg-white/20 text-gray-200 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Market Cap</th>
              <th className="px-6 py-3">Change</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((stock, idx) => (
                <motion.tr
                  key={stock._id || idx}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-white/20 hover:bg-white/10 transition-all duration-500"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={stock.logo}
                      alt={stock.name}
                      width={35}
                      height={35}
                      className="rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(stock.name) +
                          "&background=random&color=fff";
                      }}
                    />
                    <span className="font-semibold">{stock.name}</span>
                  </td>
                  <td className="px-6 py-4">{stock.price}</td>
                  <td className="px-6 py-4">{stock.marketCap}</td>
                  <td
                    className={`px-6 py-4 font-bold ${
                      stock.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stock.change}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTradeNow(stock.name)}
                      className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                    >
                      Trade Now →
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  ❌ No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/20 disabled:opacity-40 transition"
        >
          ⬅ Previous
        </button>
        <span className="text-gray-300 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/20 disabled:opacity-40 transition"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
