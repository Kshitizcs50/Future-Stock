"use client";
import React from "react";

const shares = [
  {
    name: "CIAL",
    price: "₹470.00",
    change: "+2.83%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBeY6cn7tZ2C6dvO8E5YcoBcxNwFpVDu0TQ&s",
    changePositive: true,
  },
  {
    name: "Orbis Financial Corporation",
    price: "₹520.00",
    change: "+12.90%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQSeBavrkAa5G6Eby6TRLljIiM7qsxVrkWw&s",
    changePositive: true,
  },
  {
    name: "Goodluck Defence & Aerospace",
    price: "₹315.00",
    change: "+14.29%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdY9CnerWnYfmOqgDcRPqLX42PVnXfiHDJg&s",
    changePositive: true,
  },
  {
    name: "Incred Holdings",
    price: "₹163.00",
    change: "-6.96%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDXRiWPrTr9M1t8iYtwjRj-TpA8pQ3tXzsg&s",
    changePositive: false,
  },
];

export default function TrendingShares() {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
        Trending Unlisted Shares
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-10">
        Discover rising opportunities in the market.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shares.map((share, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {/* Logo + Name */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <img
                src={share.logo}
                alt={share.name}
                width={50}
                height={50}
                className="rounded-full object-contain ring-2 ring-gray-200"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {share.name}
              </h3>
            </div>

            {/* Price + Change */}
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {share.price}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  share.changePositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {share.change}
              </p>
            </div>

            {/* Smooth line chart */}
            <div className="mt-5">
              <svg height="45" width="100%">
                <path
                  d="M0,30 Q50,10 100,20 T200,15"
                  stroke={share.changePositive ? "green" : "red"}
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
