"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createChart, type IChartApi, type CandlestickData } from "lightweight-charts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpCircle, ArrowDownCircle, DollarSign, LineChart, Newspaper } from "lucide-react";

// 🎨 Shareholding Colors
const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#a855f7"];

const sampleData = [
  { name: "Promoters", value: 55 },
  { name: "Retail", value: 20 },
  { name: "FII", value: 15 },
  { name: "DII", value: 10 },
];

export default function StockPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Chart Init
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: { background: { color: "transparent" }, textColor: "#e2e8f0" },
        grid: { vertLines: { color: "#1e293b" }, horzLines: { color: "#1e293b" } },
        width: chartContainerRef.current.clientWidth,
        height: 350,
      });
      chartRef.current = chart;

      const candleSeries = chart.addCandlestickSeries();
      const data: CandlestickData[] = [
        { time: "2023-01-01", open: 100, high: 120, low: 90, close: 110 },
        { time: "2023-01-02", open: 110, high: 125, low: 100, close: 120 },
        { time: "2023-01-03", open: 120, high: 135, low: 115, close: 130 },
        { time: "2023-01-04", open: 130, high: 140, low: 125, close: 135 },
        { time: "2023-01-05", open: 135, high: 145, low: 130, close: 140 },
      ];
      candleSeries.setData(data);
    }
    return () => {
      chartRef.current?.remove();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Unlisted Valley</h1>
          <p className="text-gray-400">Unlisted Shares Trading Platform</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
            +5.2%
          </span>
          <p className="text-sm text-gray-400">Last updated: 2m ago</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="relative flex gap-8 mb-6">
        {["overview", "fundamentals", "news", "transactions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 capitalize ${
              activeTab === tab ? "text-green-400" : "text-gray-400"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 glass-card p-4 rounded-2xl shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <LineChart size={20} /> Price Chart
            </h2>
            <div className="flex gap-2 mb-4">
              {["1D", "1W", "1M", "1Y"].map((r) => (
                <button
                  key={r}
                  className="px-3 py-1 rounded-full bg-gray-800 hover:bg-green-600 transition"
                >
                  {r}
                </button>
              ))}
            </div>
            <div ref={chartContainerRef} className="w-full h-[350px]" />
          </motion.div>

          {/* Shareholding */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-card p-4 rounded-2xl shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-3">Shareholding Pattern</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sampleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {sampleData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Trade Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card p-4 rounded-2xl shadow-lg lg:col-span-3"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <DollarSign size={20} /> Trade Now
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="number"
                  placeholder=" "
                  className="peer w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-green-500 outline-none"
                />
                <label className="absolute left-3 top-2.5 text-gray-400 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all">
                  Quantity
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder=" "
                  className="peer w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-green-500 outline-none"
                />
                <label className="absolute left-3 top-2.5 text-gray-400 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all">
                  Price
                </label>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold flex items-center justify-center gap-1">
                  <ArrowUpCircle size={18} /> Buy
                </button>
                <button className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold flex items-center justify-center gap-1">
                  <ArrowDownCircle size={18} /> Sell
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Fundamentals */}
      {activeTab === "fundamentals" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "PE Ratio", value: "18.5", icon: "📊" },
            { label: "Book Value", value: "₹230", icon: "📘" },
            { label: "Dividend Yield", value: "2.1%", icon: "💰" },
            { label: "Market Cap", value: "₹12,300 Cr", icon: "🏦" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-4 rounded-2xl shadow-lg"
            >
              <p className="text-gray-400">{item.icon} {item.label}</p>
              <h3 className="text-xl font-bold">{item.value}</h3>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* News */}
      {activeTab === "news" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              className="glass-card rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={`https://picsum.photos/400/200?random=${n}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Stock Market Update {n}</h3>
                <p className="text-gray-400 text-sm mb-2">ET Markets • 2h ago</p>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Transactions */}
      {activeTab === "transactions" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-400">
                <th>Date</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2023-09-01", type: "Buy", qty: 50, price: 120 },
                { date: "2023-09-02", type: "Sell", qty: 20, price: 130 },
              ].map((t, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg ${
                    t.type === "Buy" ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">{t.type}</td>
                  <td className="p-3">{t.qty}</td>
                  <td className="p-3">₹{t.price}</td>
                  <td className="p-3">₹{t.qty * t.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
