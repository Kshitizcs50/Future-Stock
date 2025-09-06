import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  name: String,
  price: String,
  marketCap: String,
  change: String,
  logo: String,
});

export default mongoose.models.Stock || mongoose.model("Stock", stockSchema);
