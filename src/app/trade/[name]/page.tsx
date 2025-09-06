"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  createChart,
  type IChartApi,
  type CandlestickData,
} from "lightweight-charts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stock {
  _id: string;
  name: string;
  price: string;
  marketCap: string;
  change: string;
  logo: string;
}

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#a855f7"];
const sampleData = [
  { name: "Promoters", value: 55 },
  { name: "Retail", value: 20 },
  { name: "FII", value: 15 },
  { name: "DII", value: 10 },
];

export default function TradePage() {
  const params = useParams();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // ✅ Tabs
  const [activeTab, setActiveTab] = useState("Overview");

  // ✅ Fetch stock from backend
  useEffect(() => {
    async function fetchStock() {
      try {
        if (!params?.name) return;

        const res = await fetch(
          `http://localhost:5000/api/stocks/name/${encodeURIComponent(
            params.name as string
          )}`
        );

        if (!res.ok) {
          console.error("Failed to fetch stock");
          setLoading(false);
          return;
        }

        const data: Stock = await res.json();
        setStock(data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStock();
  }, [params]);

  // ✅ Setup lightweight-charts (fixed version)
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: "#1e293b" }, // dark background for visibility
          textColor: "#ffffff",
        },
        grid: {
          vertLines: { color: "#334155" },
          horzLines: { color: "#334155" },
        },
        width: chartContainerRef.current.clientWidth,
        height: 350,
      });

      chartRef.current = chart;

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderUpColor: "#22c55e",
        borderDownColor: "#ef4444",
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
      });

      const data: CandlestickData[] = [
        { time: "2023-01-01", open: 100, high: 120, low: 90, close: 110 },
        { time: "2023-01-02", open: 110, high: 125, low: 100, close: 120 },
        { time: "2023-01-03", open: 120, high: 135, low: 115, close: 130 },
        { time: "2023-01-04", open: 130, high: 140, low: 125, close: 135 },
        { time: "2023-01-05", open: 135, high: 145, low: 130, close: 140 },
      ];
      candleSeries.setData(data);

      // ✅ Resize listener
      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef.current?.clientWidth || 600,
        });
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
        chartRef.current = null;
      };
    }
  }, []);

  if (loading)
    return <p className="text-center py-10 text-white">Loading stock...</p>;
  if (!stock)
    return <p className="text-center py-10 text-red-500">Stock not found!</p>;

  return (
    <section className="p-6 space-y-8 bg-slate-900 min-h-screen text-white">
      {/* ✅ Dashboard Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Left Heading */}
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard{" "}
            {stock?.name && (
              <span className="text-green-400">· {stock.name}</span>
            )}
          </h1>
          <p className="text-sm text-gray-400">
            {stock?.name
              ? `Tracking ${stock.name} stock performance`
              : "Track your unlisted shares portfolio"}
          </p>

          {/* Stock Info Row */}
          {stock && (
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
              <p>
                <span className="text-gray-400">Price:</span>{" "}
                <span className="font-semibold text-green-400">
                  {stock.price}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Change:</span>{" "}
                <span
                  className={`font-semibold ${
                    stock.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.change}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Market Cap:</span>{" "}
                <span className="font-semibold">{stock.marketCap}</span>
              </p>
            </div>
          )}
        </div>

        {/* ✅ Right Stats Bar */}
        <div className="mt-6 md:mt-0 flex gap-8 bg-slate-800 px-6 py-4 rounded-xl shadow-lg">
          <div>
            <p className="text-gray-400 text-sm">Price</p>
            <p className="text-xl font-bold text-green-400">
              {stock?.price || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Change</p>
            <p
              className={`text-xl font-bold ${
                stock?.change?.startsWith("+")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stock?.change || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-xl font-bold">{stock?.marketCap || "—"}</p>
          </div>
        </div>
      </div>

      {/* ✅ Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-slate-800 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-xl font-bold text-white">📈 Price Chart</h2>
            <div className="flex gap-2 mt-3 md:mt-0">
              {["1D", "1W", "1M", "1Y"].map((range) => (
                <button
                  key={range}
                  className="px-3 py-1 rounded-full bg-gray-700 text-gray-200 hover:bg-green-600 transition"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div ref={chartContainerRef} className="w-full h-[350px]" />
          {/* ✅ Trade Now Section */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900 shadow-md">
            <h3 className="text-lg font-semibold mb-3">💰 Trade Now</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Quantity"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition font-bold">
                Buy
              </button>
              <button className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-bold">
                Sell
              </button>
            </div>
          </div>
        </motion.div>

        {/* Shareholding */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-2xl bg-slate-800 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Shareholding Pattern</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sampleData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={{ fill: "#fff", fontSize: 14 }}
              >
                {sampleData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ✅ Tabs Section Below Shareholding */}
      <div className="p-6 rounded-2xl bg-slate-800 shadow-xl">
        <div className="flex gap-6 border-b border-gray-700 mb-4">
          {["Overview", "Fundamentals", "News", "Transactions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ✅ Tab Content */}
        {activeTab === "Overview" && (
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="p-2 text-gray-400">Company Name</td>
                <td className="p-2 font-semibold">{stock.name}</td>
              </tr>
              <tr>
                <td className="p-2 text-gray-400">Market Cap</td>
                <td className="p-2">{stock.marketCap}</td>
              </tr>
              <tr>
                <td className="p-2 text-gray-400">Current Price</td>
                <td className="p-2">{stock.price}</td>
              </tr>
              <tr>
                <td className="p-2 text-gray-400">Change</td>
                <td
                  className={`p-2 ${
                    stock.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.change}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === "Fundamentals" && (
          <p className="text-gray-400">📊 Fundamentals data will go here...</p>
        )}
        {activeTab === "News" && (
          <p className="text-gray-400">📰 Latest news articles here...</p>
        )}
        {activeTab === "Transactions" && (
          <p className="text-gray-400">💰 User transactions will appear here...</p>
        )}
      </div>
    </section>
  );
}
