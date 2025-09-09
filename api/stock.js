import connectDB from "../backend/utils/db";
import Stock from "../backend/models/Stock";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const stocks = await Stock.find();
      return res.status(200).json(stocks);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
