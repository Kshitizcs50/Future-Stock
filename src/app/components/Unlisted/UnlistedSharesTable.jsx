"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// ✅ Dummy Stock Data with Online Logos
const stockData = [
  {
    name: "NSE",
    price: 2060,
    marketCap: "₹5.10 Lakh Cr",
    change: "+66%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/27/National_Stock_Exchange_of_India_Logo.svg",
    history: [
      { date: "Jan", value: 1200 },
      { date: "Feb", value: 1800 },
      { date: "Mar", value: 1700 },
      { date: "Apr", value: 2200 },
      { date: "May", value: 2100 },
      { date: "Jun", value: 2060 },
    ],
  },
  {
    name: "Reliance Jio",
    price: 1450,
    marketCap: "₹6.30 Lakh Cr",
    change: "+25%",
    changeType: "up",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Reliance_Jio_Logo.svg",
    history: [
      { date: "Jan", value: 800 },
      { date: "Feb", value: 900 },
      { date: "Mar", value: 1100 },
      { date: "Apr", value: 1200 },
      { date: "May", value: 1400 },
      { date: "Jun", value: 1450 },
    ],
  },
];

export default function UnlistedShares() {
  const [selectedStock, setSelectedStock] = useState(null);

  if (selectedStock) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
        {/* Left Side - Chart + Stock Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={selectedStock.logo}
              alt={selectedStock.name}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{selectedStock.name}</h2>
              <p className="text-gray-400">{selectedStock.marketCap}</p>
            </div>
          </div>

          <h3 className="text-3xl font-extrabold mb-2">
            ₹{selectedStock.price.toLocaleString()}
          </h3>
          <p
            className={`text-lg font-semibold ${
              selectedStock.changeType === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {selectedStock.change}
          </p>

          {/* Chart */}
          <div className="h-72 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedStock.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ background: "#111", border: "none" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={selectedStock.changeType === "up" ? "#22c55e" : "#ef4444"}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side - Buy Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold mb-4">{selectedStock.name} Unlisted Shares</h3>
          <p className="text-2xl font-semibold mb-6">₹{selectedStock.price}</p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter name"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              placeholder="Enter shares"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="tel"
              placeholder="Enter mobile"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Enter email"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:scale-105 transition">
              Submit
            </button>
          </form>

          <button
            onClick={() => setSelectedStock(null)}
            className="mt-6 text-gray-400 hover:text-white underline"
          >
            ← Back to all stocks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-300">
        📊 Unlisted Shares
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stockData.map((stock, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedStock(stock)}
            className="cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-lg" />
              <h3 className="font-semibold">{stock.name}</h3>
            </div>
            <p className="text-lg font-bold">₹{stock.price}</p>
            <p
              className={`font-semibold ${
                stock.changeType === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {stock.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
