"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface News {
  title: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage: string | null;
}

export default function UnlistedNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stocks/news/unlisted");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: { articles: News[] } = await res.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Latest Unlisted Share News</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500">No news available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition flex flex-col"
            >
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.source.name} • {new Date(item.publishedAt).toLocaleDateString()}
              </p>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
