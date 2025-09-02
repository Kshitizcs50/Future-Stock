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
    img: "/news/nsdl1.png",
  },
  {
    id: 2,
    tag: "NSDL",
    title: "NSDL gets another extension to list its IPO",
    date: "22/07/2025",
    img: "/news/nsdl2.png",
  },
  {
    id: 3,
    tag: "Nayara Energy",
    title:
      "Nayara Energy to invest Rs 70,000 cr in India; says EU sanctions go against India",
    date: "22/07/2025",
    img: "/news/nayara.png",
  },
  {
    id: 4,
    tag: "NSDL",
    title:
      "NSDL IPO: Trading in unlisted shares freezes; check key details from DRHP",
    date: "21/07/2025",
    img: "/news/nsdl-office.png",
  },
  {
    id: 5,
    tag: "Studds",
    title: "Helmet maker Studds Accessories receives approval to float IPO",
    date: "15/07/2025",
    img: "/news/studds.png",
  },
];

export default function NewsArticles() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">News Articles</h2>
        <div className="flex items-center gap-3">
          <span className="text-green-600 cursor-pointer font-medium hover:underline">
            See more
          </span>
          <div className="flex gap-2">
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100 transition">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100 transition">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition group"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={article.img}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                {article.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-gray-800 font-semibold text-sm line-clamp-3 group-hover:text-green-600 transition">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{article.date}</p>
              <button className="mt-3 text-green-600 text-sm font-medium hover:underline">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
