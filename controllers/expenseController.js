const Expense = require("../models/expense");
addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json({ expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find().sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentMonthExpenses = async (req, res) => {
  try {
    const now = new Date(); // Current date
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const expenses = await Expense.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

editExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body, // the data to update
      { new: true } // return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Expense
deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// function get each Expense based on id
getEachExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const getEachExpense = await Expense.findById(id);

    if (!getEachExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(getEachExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getEachExpense,
  getCurrentMonthExpenses,
};
