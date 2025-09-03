"use client";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "NSDL's Rs 4,000-crore offer for sale set to open next week",
    category: "NSDL",
    date: "22/07/2025",
    image: "/images/nsdl1.jpg",
  },
  {
    id: 2,
    title: "NSDL gets another extension to list its IPO",
    category: "NSDL",
    date: "22/07/2025",
    image: "/images/nsdl2.jpg",
  },
  {
    id: 3,
    title:
      "Nayara Energy to invest Rs 70,000 cr in India; says EU sanctions go against India's interests",
    category: "Nayara Energy",
    date: "22/07/2025",
    image: "/images/nayara.jpg",
  },
  {
    id: 4,
    title:
      "NSDL IPO: Trading in unlisted shares freezes; check key details from DRHP",
    category: "NSDL",
    date: "21/07/2025",
    image: "/images/nsdl3.jpg",
  },
];

export default function News() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">Latest News</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Latest Insights & Updates on Unlisted Shares
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="group h-full flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
                {/* Image with Hover Zoom */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-3 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  {/* Button at bottom */}
                  <button className="mt-auto pt-4 text-blue-600 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
