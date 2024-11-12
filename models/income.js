const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Income", incomeSchema);
