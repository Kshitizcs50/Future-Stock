"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    id: 1,
    tag: "NSDL",
    title: "NSDL's Rs 4,000-crore offer for sale set to open next week",
    date: "22/07/2025",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    tag: "NSDL",
    title: "NSDL gets another extension to list its IPO",
    date: "22/07/2025",
    img: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    tag: "Nayara Energy",
    title:
      "Nayara Energy to invest Rs 70,000 cr in India; says EU sanctions go against India",
    date: "22/07/2025",
    img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    tag: "NSDL",
    title:
      "NSDL IPO: Trading in unlisted shares freezes; check key details from DRHP",
    date: "21/07/2025",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    tag: "Studds",
    title: "Helmet maker Studds Accessories receives approval to float IPO",
    date: "15/07/2025",
    img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewsArticles() {
  return (
    <section className="py-14 px-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Latest <span className="text-green-600">News</span>
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-green-600 cursor-pointer font-medium hover:underline">
            See more
          </span>
          <div className="flex gap-2">
            <button className="p-2 bg-white shadow-md rounded-full hover:bg-green-50 hover:shadow-lg transition">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white shadow-md rounded-full hover:bg-green-50 hover:shadow-lg transition">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition group"
          >
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={article.img}
                alt={article.title}
            
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                {article.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-36">
              <h3 className="text-gray-800 font-semibold text-sm line-clamp-3 group-hover:text-green-600 transition">
                {article.title}
              </h3>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-500">{article.date}</p>
                <button className="text-green-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
