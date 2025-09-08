import connectDB from "../utils/db";
import Stock from "../models/Stock";

export default async function handler(req, res) {
  await connectDB();

  try {
    // ✅ Handle GET /api/stocks → get all stocks
    if (req.method === "GET" && !req.query.name && !req.query.type) {
      const stocks = await Stock.find();
      return res.status(200).json(stocks);
    }

    // ✅ Handle GET /api/stocks?name=XYZ → get stock by name
    if (req.method === "GET" && req.query.name) {
      const stockName = decodeURIComponent(req.query.name).toLowerCase();
      console.log("➡️ Looking for stock:", stockName);

      const stock = await Stock.findOne({
        name: { $regex: new RegExp("^" + stockName + "$", "i") },
      });

      if (!stock) {
        console.log("❌ Stock not found:", stockName);
        return res.status(404).json({ message: "Stock not found" });
      }

      return res.status(200).json(stock);
    }

    // ✅ Handle GET /api/stocks?type=news → latest unlisted news
    if (req.method === "GET" && req.query.type === "news") {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=unlisted%20shares&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
      );

      const data = await response.json();
      return res.status(200).json({ articles: data.articles || [] });
    }

    // ✅ Method not allowed
    res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
}
