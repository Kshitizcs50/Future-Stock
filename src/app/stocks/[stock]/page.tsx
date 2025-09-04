"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { createChart, type IChartApi, type CandlestickData } from "lightweight-charts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// 🎨 Shareholding Colors
const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#8b5cf6", "#ef4444", "#14b8a6", "#eab308", "#9ca3af"];

// ✅ Stock Data
const stockData: Record<string, any> = {
  NSE: {
    name: "National Stock Exchange Limited (NSE)",
    price: "₹2,060.00",
    marketCap: "₹5.10 Lakh Cr",
    change: "+66%",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/27/National_Stock_Exchange_of_India_Logo.svg",
    about:
      "The National Stock Exchange of India (NSE) is India’s leading stock exchange, providing trading in equities, derivatives, currencies, and bonds...",
    fundamentals: {
      faceValue: "₹1",
      bookValue: "₹123",
      roe: "40%",
      debtToEquity: "N/A",
      peRatio: "42",
      pbRatio: "17",
      dividend: "₹35",
      totalShares: "2,475,000,000",
      marketCap: "₹509,850.00 Cr",
      high52: "₹2400",
      low52: "₹1240",
      cin: "U67120MH1992PLC069769",
      isin: "INE721I01024",
    },
    shareholding: [
      { name: "Individual", value: 21.27 },
      { name: "Body Corporates-Listed", value: 10.27 },
      { name: "Body Corporate-Unlisted", value: 7.98 },
      { name: "Financial Institutions/Banks", value: 4.73 },
      { name: "Insurance Companies", value: 19.22 },
      { name: "Venture Capital Fund/AIFs", value: 5.28 },
      { name: "Foreign Holdings", value: 28 },
      { name: "Others", value: 3.25 },
    ],
    news: [
      {
        title: "NSE crosses record trading volume in 2025",
        img: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/17/full/1689574820-8699.jpg",
      },
      {
        title: "NSE to launch new AI-powered trading system",
        img: "https://static.businessworld.in/article/article_extra_large_image/1592551794_dA86rG_nse.jpg",
      },
    ],
    latestTransactions: [
      { user: "Rahul", type: "Buy", shares: 50, price: "₹2060", time: "2 min ago" },
      { user: "Ananya", type: "Sell", shares: 20, price: "₹2055", time: "5 min ago" },
      { user: "Karan", type: "Buy", shares: 100, price: "₹2062", time: "10 min ago" },
      { user: "Megha", type: "Buy", shares: 10, price: "₹2061", time: "15 min ago" },
      { user: "Vikram", type: "Sell", shares: 40, price: "₹2050", time: "20 min ago" },
    ],
  },
};

export default function StockPage() {
  const params = useParams();
  const stockName = decodeURIComponent(params.stock as string);
  const stock = stockData[stockName];

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const [activeTab, setActiveTab] = useState("about");

  // 📈 Chart Setup
  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (chartRef.current) chartRef.current.remove();

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { background: { color: "#111" }, textColor: "#fff" },
      grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const dummyData: CandlestickData[] = [
      { time: "2024-01-01", open: 100, high: 120, low: 90, close: 110 },
      { time: "2024-01-02", open: 110, high: 130, low: 100, close: 125 },
      { time: "2024-01-03", open: 125, high: 140, low: 115, close: 120 },
      { time: "2024-01-04", open: 120, high: 135, low: 110, close: 130 },
      { time: "2024-01-05", open: 130, high: 150, low: 120, close: 140 },
    ];

    candleSeries.setData(dummyData);
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [stockName]);

  if (!stock) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-xl">
        ❌ Stock not found
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white space-y-8">
      {/* 🏦 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <img src={stock.logo} alt={stock.name} width={80} height={80} className="rounded bg-white p-2 shadow-xl" />
        <div>
          <h1 className="text-3xl font-bold">{stock.name}</h1>
          <p className="text-lg">{stock.price}</p>
          <p className={stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}>{stock.change}</p>
          <p className="text-gray-400">{stock.marketCap}</p>
        </div>
      </motion.div>

      {/* 📊 Chart + Trade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ✅ Chart Container (Fix for missing chart) */}
        <div className="md:col-span-2 bg-gray rounded shadow p-4">
          <h2 className="text-lg font-bold mb-2">Live Stock Chart</h2>
          <div
            ref={chartContainerRef}
            className="rounded border bg h-[300px]"
          />
        </div>

        {/* ✅ Trade Card with Stylish Look */}
        <div className=" rounded shadow-lg p-6 hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4 text-center">Trade Now</h2>
          <div className="flex gap-2 mb-4">
            <button className="flex-1 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">
              Buy
            </button>
            <button className="flex-1 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition">
              Sell
            </button>
          </div>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Enter shares"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Enter mobile"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* 📌 Tabs */}
      <div>
        <div className="flex gap-6 border-b border-gray-700">
          {["about", "fundamentals", "shareholding", "news", "transactions"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-3 font-semibold transition ${
                activeTab === tab ? "border-b-2 border-green-500 text-green-400" : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.p
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-gray-300"
            >
              {stock.about}
            </motion.p>
          )}

          {activeTab === "fundamentals" && (
            <motion.div
              key="fundamentals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
            >
              {Object.entries(stock.fundamentals).map(([key, val]) => (
                <div key={key} className="p-3 border border-gray-700 rounded bg-gray-800 shadow">
                  <p className="text-gray-400 text-sm">{key}</p>
                  <p className="font-bold">{String(val)}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "shareholding" && (
            <motion.div
              key="shareholding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
            >
              <div>
                {stock.shareholding.map((s: any, i: number) => (
                  <p key={i} className="flex justify-between border-b border-gray-700 py-1 text-gray-300">
                    <span>{s.name}</span>
                    <span className="font-bold">{s.value}%</span>
                  </p>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stock.shareholding} dataKey="value" nameKey="name" outerRadius={100}>
                    {stock.shareholding.map((_: any, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
            >
              {stock.news.map((n: any, i: number) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={i}
                  className="bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <img src={n.img} alt={n.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h3 className="font-bold text-lg text-gray-100">{n.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-gray-800 shadow rounded overflow-hidden"
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-900 text-gray-400 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Shares</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.latestTransactions.map((tx: any, i: number) => (
                    <motion.tr
                      key={i}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="border-b border-gray-700 last:border-0"
                    >
                      <td className="px-4 py-2">{tx.user}</td>
                      <td className={`px-4 py-2 font-bold ${tx.type === "Buy" ? "text-green-400" : "text-red-400"}`}>
                        {tx.type}
                      </td>
                      <td className="px-4 py-2">{tx.shares}</td>
                      <td className="px-4 py-2">{tx.price}</td>
                      <td className="px-4 py-2 text-gray-400">{tx.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
