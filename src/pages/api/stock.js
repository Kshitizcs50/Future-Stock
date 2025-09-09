import connectDB from "../../../backend/utils/db";
import Stock from "../../../backend/models/Stock";

export default async function handler(req, res) {
  await connectDB();

  try {
    // ✅ GET /api/stocks → all stocks
    if (req.method === "GET" && !req.query.name && !req.query.type) {
      const stocks = await Stock.find();
      return res.status(200).json(stocks);
    }

    // ✅ GET /api/stocks?name=XYZ → stock by name
    if (req.method === "GET" && req.query.name) {
      const stockName = decodeURIComponent(req.query.name).toLowerCase();
      const stock = await Stock.findOne({
        name: { $regex: new RegExp("^" + stockName + "$", "i") },
      });

      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }

      return res.status(200).json(stock);
    }

    // ✅ GET /api/stocks?type=news → fetch unlisted news
    if (req.method === "GET" && req.query.type === "news") {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=unlisted%20shares&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
      );

      const data = await response.json();
      return res.status(200).json({ articles: data.articles || [] });
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
