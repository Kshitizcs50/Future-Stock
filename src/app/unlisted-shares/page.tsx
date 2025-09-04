"use client";

import { motion } from "framer-motion";

const stocks = [
  {
    name: "NSE",
    price: "₹2,060.00",
    marketCap: "₹5.10 Lakh Cr",
    change: "+66%",
    logo: "https://logo.clearbit.com/nseindia.com",
  },
  {
    name: "TATA Capital",
    price: "₹800.00",
    marketCap: "₹2.96 Lakh Cr",
    change: "-11%",
    logo: "https://logo.clearbit.com/tatacapital.com",
  },
  {
    name: "Nayara Energy",
    price: "₹1,250.00",
    marketCap: "₹1.86 Lakh Cr",
    change: "+80%",
    logo: "https://logo.clearbit.com/nayaraenergy.com",
  },
  {
    name: "SBI AMC",
    price: "₹2,760.00",
    marketCap: "₹1.40 Lakh Cr",
    change: "+15%",
    logo: "https://logo.clearbit.com/sbimf.com",
  },
  {
    name: "Capgemini",
    price: "₹11,175.00",
    marketCap: "₹66.24 Thousand Cr",
    change: "-9%",
    logo: "https://logo.clearbit.com/capgemini.com",
  },
  {
    name: "HDB Financial Services",
    price: "₹740.00",
    marketCap: "₹58.69 Thousand Cr",
    change: "-38%",
    logo: "https://logo.clearbit.com/hdbfs.com",
  },
];

export default function UnlistedShares() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
        >
          Buy & Sell Unlisted Shares
        </motion.h2>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover top private companies and emerging opportunities — compare
          price, market cap, and growth trends in real time.
        </p>

        {/* Table */}
        <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
          <table className="w-full border-collapse text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-4 px-6">Company</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-right">Market Cap</th>
                <th className="py-4 px-6 text-right">Change (1yr)</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <motion.tr
                  key={stock.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 font-medium flex items-center gap-3">
                    <img
                      src={stock.logo}
                      alt={stock.name}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(stock.name) +
                          "&background=random&color=fff";
                      }}
                    />
                    {stock.name}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    {stock.price}
                  </td>
                  <td className="py-4 px-6 text-right">{stock.marketCap}</td>
                  <td
                    className={`py-4 px-6 text-right font-semibold ${
                      stock.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {stock.change}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      Trade Now
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
