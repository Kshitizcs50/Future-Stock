"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createChart, type IChartApi, type CandlestickData } from "lightweight-charts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Sun,
  Moon,
  Bell,
  Home,
  TrendingUp,
  Newspaper,
  Settings,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

// 🎨 Shareholding Colors
const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#a855f7"];

const sampleData = [
  { name: "Promoters", value: 55 },
  { name: "Retail", value: 20 },
  { name: "FII", value: 15 },
  { name: "DII", value: 10 },
];

export default function StockDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Chart Init
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: { background: { color: "transparent" }, textColor: darkMode ? "#e2e8f0" : "#1e293b" },
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
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-gray-100" : "bg-gray-100 text-gray-900"}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 p-6 flex flex-col gap-6 border-r border-gray-700"
        >
          <h2 className="text-2xl font-bold">Unlisted Valley</h2>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Home", icon: Home },
              { label: "Market", icon: TrendingUp },
              { label: "News", icon: Newspaper },
              { label: "Settings", icon: Settings },
            ].map((item, idx) => (
              <motion.button
                whileHover={{ x: 5 }}
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-500/10 transition"
              >
                <item.icon size={20} />
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-400">Track your unlisted shares portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell size={22} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="relative flex gap-8 mb-6">
            {["overview", "fundamentals", "news", "transactions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 capitalize ${activeTab === tab ? "text-green-400" : "text-gray-400"}`}
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

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Chart */}
                <motion.div whileHover={{ scale: 1.01 }} className="lg:col-span-2 p-4 rounded-2xl bg-gray-900/50 shadow-lg">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    📈 Price Chart
                  </h2>
                  <div className="flex gap-2 mb-4">
                    {["1D", "1W", "1M", "1Y"].map((r) => (
                      <button key={r} className="px-3 py-1 rounded-full bg-gray-800 hover:bg-green-600 transition">
                        {r}
                      </button>
                    ))}
                  </div>
                  <div ref={chartContainerRef} className="w-full h-[350px]" />
                </motion.div>

                {/* Shareholding */}
                <motion.div whileHover={{ scale: 1.03 }} className="p-4 rounded-2xl bg-gray-900/50 shadow-lg">
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

                {/* Trade */}
                <motion.div whileHover={{ y: -4 }} className="lg:col-span-3 p-4 rounded-2xl bg-gray-900/50 shadow-lg">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <DollarSign size={20} /> Trade Now
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <input type="number" placeholder="Quantity" className="w-full p-3 rounded-lg bg-gray-800 focus:border-green-500 outline-none" />
                    </div>
                    <div className="relative">
                      <input type="number" placeholder="Price" className="w-full p-3 rounded-lg bg-gray-800 focus:border-green-500 outline-none" />
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
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
