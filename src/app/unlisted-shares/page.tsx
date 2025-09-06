"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Stock {
  _id: string;
  name: string;
  price: string;
  marketCap: string;
  change: string;
  logo: string;
}

export default function UnlistedShares() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("http://localhost:5000/api/stocks");
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
    return <p className="text-center py-10">Loading stocks...</p>;
  }

  // Pagination logic
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Unlisted Shares Market
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Market Cap</th>
              <th className="p-3 text-left">Change</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((stock, index) => (
              <motion.tr
                key={stock._id || index}
                whileHover={{ scale: 1.01 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={stock.logo}
                    alt={stock.name}
                    width={40}
                    height={40}
                    className="rounded-full border"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(stock.name) +
                        "&background=random&color=fff";
                    }}
                  />
                </td>
                <td className="p-3 font-medium">{stock.name}</td>
                <td className="p-3">{stock.price}</td>
                <td className="p-3">{stock.marketCap}</td>
                <td
                  className={`p-3 font-semibold ${
                    stock.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stock.change}
                </td>
                <td className="p-3 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      router.push(`/trade/${encodeURIComponent(stock.name)}`)
                    }
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                  >
                    Trade Now
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={indexOfLastStock >= stocks.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
