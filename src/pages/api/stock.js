// src/pages/api/stock.js
import connectDB from "../../../backend/utils/db";
import Stock from "../../../backend/models/Stock";

export default async function handler(req, res) {
  try {
    console.log("➡️ /api/stock called with method:", req.method);

    await connectDB();
    console.log("✅ DB connected");

    if (req.method === "GET") {
      const stocks = await Stock.find({});
      console.log("✅ Stocks fetched:", stocks.length);
      return res.status(200).json(stocks);
    }

    if (req.method === "POST") {
      const { name, price, marketCap, change, logo } = req.body;
      const stock = new Stock({ name, price, marketCap, change, logo });
      await stock.save();
      console.log("✅ Stock created:", stock);
      return res.status(201).json(stock);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("❌ API Error in /api/stock:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
