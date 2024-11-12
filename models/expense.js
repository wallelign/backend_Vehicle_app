const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
