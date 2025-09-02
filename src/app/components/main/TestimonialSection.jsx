"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    role: "Investor",
    quote:
      "Investing in unlisted stocks has been an eye-opener. The potential for growth in pre-IPO companies is huge, and this platform made it seamless to dive in.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", // online avatar
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Entrepreneur",
    quote:
      "This platform gave me access to opportunities I never thought possible. It feels safe, smooth, and transparent.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Trader",
    quote:
      "I love how easy it is to discover and invest in pre-IPO companies. The experience feels futuristic and simple.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Quote */}
        <motion.div
          key={testimonials[index].id}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-5xl text-green-500 font-serif">“</span>
          <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
            {testimonials[index].quote}
          </p>
          <div>
            <h4 className="text-lg font-semibold text-green-600">
              {testimonials[index].name}
            </h4>
            <p className="text-sm text-green-500">
              {testimonials[index].role}
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition shadow-md"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition shadow-md"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </motion.div>

        {/* Right - Avatar */}
        <motion.div
          key={testimonials[index].id + "-img"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-purple-200 to-pink-100 flex items-center justify-center shadow-xl">
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              width={180}
              height={180}
              className="rounded-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
