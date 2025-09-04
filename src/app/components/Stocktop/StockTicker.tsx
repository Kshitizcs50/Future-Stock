"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const stocks = [
  { symbol: "TSLA", price: "$262.78", change: "-0.8%" },
  { symbol: "AMZN", price: "$134.11", change: "+0.5%" },
  { symbol: "GOOG", price: "$141.92", change: "+2.1%" },
  { symbol: "MSFT", price: "$327.15", change: "-1.4%" },
  { symbol: "AAPL", price: "$189.32", change: "+1.2%" },
  { symbol: "META", price: "$297.64", change: "-0.6%" },
  { symbol: "NSE", price: "₹2,060.00", change: "+1.5%" },
  { symbol: "SBI", price: "₹610.00", change: "-0.3%" },
];

export default function StockTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#0b1221] py-3 border-y border-gray-800">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 25, // slower for desktop
          repeat: Infinity,
        }}
      >
        {[...stocks, ...stocks].map((stock, i) => {
          const isPositive = stock.change.startsWith("+");
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-1 rounded-lg bg-[#141c2f] shadow-sm border border-gray-700"
            >
              <span className="text-gray-200 font-semibold">{stock.symbol}</span>
              <span className="text-gray-100">{stock.price}</span>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`font-medium ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stock.change}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
