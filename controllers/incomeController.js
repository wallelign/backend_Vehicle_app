const Income = require("../models/income");
addIncome = async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json({ income });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentMonthIncomes = async (req, res) => {
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

    const income = await Income.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ date: -1 });

    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

editIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      req.body, // the data to update
      { new: true } // return the updated document
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete income
deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// function get each income based on id
getEachIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const getEachIncome = await Income.findById(id);

    if (!getEachIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(getEachIncome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addIncome,
  getIncomes,
  editIncome,
  deleteIncome,
  getEachIncome,
  getCurrentMonthIncomes,
};
