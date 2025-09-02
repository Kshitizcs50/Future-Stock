"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center text-center py-24 px-6 overflow-hidden bg-[#f9fafb]">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-gradient-to-r  from-teal-300 via-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      {/* Content */}
      <div className="relative max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          India’s Trusted Platform to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 block min-h-[3.5rem] md:min-h-[4.5rem]">
            {/* 👇 Fixed stable height so no jumping */}
            <Typewriter
              words={[
                "Buy and Sell Unlisted Shares",
                "Invest in Pre-IPO Companies",
                "Discover Hidden Opportunities",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={35}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Invest in high growth companies before they go public
        </p>
        <button className="mt-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-all duration-300">
          Explore Companies
        </button>
      </div>

      {/* Blob Animation Styles */}
      <style jsx>{`
        .animate-blob {
          animation: blob 14s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
