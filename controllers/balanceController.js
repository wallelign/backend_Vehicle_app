const Expense = require("../models/expense");
const Income = require("../models/income");

const balance = async (req, res) => {
  try {
    const incomes = await Income.find({});
    const expenses = await Expense.find({});

    const totalIncomeUSD = incomes
      .filter((income) => income.currency === "USD")
      .reduce((acc, income) => acc + income.amount, 0);

    const totalIncomeETB = incomes
      .filter((income) => income.currency === "ETB")
      .reduce((acc, income) => acc + income.amount, 0);

    const totalExpenseUSD = expenses
      .filter((expense) => expense.currency === "USD")
      .reduce((acc, expense) => acc + expense.amount, 0);

    const totalExpenseETB = expenses
      .filter((expense) => expense.currency === "ETB")
      .reduce((acc, expense) => acc + expense.amount, 0);

    const usdBalance = totalIncomeUSD - totalExpenseUSD;
    const etbBalance = totalIncomeETB - totalExpenseETB;

    res.status(200).json({
      usdBalance,
      etbBalance,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { balance };
