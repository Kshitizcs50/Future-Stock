const express = require("express");

const Stock = require("../models/Stock");

const router = express.Router();

// 📌 Get all stocks
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get stock by name
router.get("/name/:name", async (req, res) => {
  try {
    const stockName = decodeURIComponent(req.params.name).toLowerCase();
    console.log("➡️ Looking for stock:", stockName);

    const stock = await Stock.findOne({
      name: { $regex: new RegExp("^" + stockName + "$", "i") },
    });

    if (!stock) {
      console.log("❌ Stock not found:", stockName);
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📌 Get latest unlisted news
router.get("/news/unlisted", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=unlisted%20shares&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();
    // ✅ Return a clean object
    res.json({ articles: data.articles || [] });
  } catch (err) {
    console.error("❌ Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
