"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="text-center bg-green-50 py-20">
      <h1 className="text-4xl font-bold max-w-3xl mx-auto">
        India’s Trusted Platform to Buy and Sell
        <span className="text-green-600"> Unlisted Shares</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Invest in high growth companies before they go public
      </p>
      <button className="mt-6 bg-black text-white px-6 py-3 rounded-full">
        Explore Companies
      </button>
    </section>
  );
}
