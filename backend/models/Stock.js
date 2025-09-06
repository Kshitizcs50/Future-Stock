const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: String,
  price: String,
  marketCap: String,
  change: String,
  logo: String,
});

module.exports = mongoose.models.Stock || mongoose.model("Stock", stockSchema);