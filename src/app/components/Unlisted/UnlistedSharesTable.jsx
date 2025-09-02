"use client";

import { useState } from "react";

// ✅ Dummy Stock Data with Online Logos
const stockData = [
  {
    name: "NSE",
    price: "₹2,060.00",
    marketCap: "₹5.10 Lakh Cr",
    change: "+66%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/27/National_Stock_Exchange_of_India_Logo.svg",
  },
  {
    name: "TATA Capital",
    price: "₹800.00",
    marketCap: "₹2.96 Lakh Cr",
    change: "-11%",
    changeType: "down",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Tata_Capital_Logo.png",
  },
  {
    name: "Reliance Jio",
    price: "₹1,450.00",
    marketCap: "₹6.30 Lakh Cr",
    change: "+25%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Reliance_Jio_Logo.svg",
  },
  {
    name: "HDFC Bank",
    price: "₹1,670.00",
    marketCap: "₹9.40 Lakh Cr",
    change: "+12%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/HDFC_Bank_Logo.svg",
  },
  {
    name: "Infosys",
    price: "₹1,550.00",
    marketCap: "₹6.30 Lakh Cr",
    change: "-5%",
    changeType: "down",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Infosys_logo.svg",
  },
  {
    name: "Paytm",
    price: "₹720.00",
    marketCap: "₹45,000 Cr",
    change: "+32%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Paytm_logo.png",
  },
  {
    name: "Zomato",
    price: "₹110.00",
    marketCap: "₹93,000 Cr",
    change: "-8%",
    changeType: "down",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
  },
  {
    name: "Byju's",
    price: "₹280.00",
    marketCap: "₹1.20 Lakh Cr",
    change: "-20%",
    changeType: "down",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Byju%27s_logo.svg",
  },
  {
    name: "OLA",
    price: "₹950.00",
    marketCap: "₹85,000 Cr",
    change: "+18%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/OLA_Cabs_logo.png",
  },
  {
    name: "Swiggy",
    price: "₹150.00",
    marketCap: "₹40,000 Cr",
    change: "+7%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
  },
];

const ITEMS_PER_PAGE = 5;

export default function UnlistedSharesTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Filtering stocks
  const filteredStocks = stockData.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredStocks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      {/* Heading with subtle neon glow */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-300 drop-shadow-[0_0_6px_#22c55e] ">
        📊 Unlisted Shares
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page when searching
          }}
          className="w-full max-w-md px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all duration-300"
        />
      </div>

      {/* Glassmorphism Table */}
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
                <tr
                  key={idx}
                  className="border-b border-white/20 hover:bg-white/10 transition-all duration-500"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={stock.logo}
                      alt={stock.name}
                      width={35}
                      height={35}
                      className="rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                    />
                    <span className="font-semibold">{stock.name}</span>
                  </td>
                  <td className="px-6 py-4">{stock.price}</td>
                  <td className="px-6 py-4">{stock.marketCap}</td>
                  <td
                    className={`px-6 py-4 font-bold ${
                      stock.changeType === "up"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stock.change}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                      Trade Now →
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
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
