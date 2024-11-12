const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const expenseController = require("../controllers/expenseController");
const balanceController = require("../controllers/balanceController");

// Income routes
router.post("/income", incomeController.addIncome);
router.get("/income", incomeController.getIncomes);
router.get("/income/current", incomeController.getCurrentMonthIncomes);
router.get("/income/:id", incomeController.getEachIncome);
router.put("/income/:id", incomeController.editIncome);
router.delete("/income/:id", incomeController.deleteIncome);

// route Balance
router.get("/balance", balanceController.balance);

// Expense routes
router.post("/expense", expenseController.addExpense);
router.get("/expense", expenseController.getExpenses);
router.get("/expense/current", expenseController.getCurrentMonthExpenses);
router.get("/expense/:id", expenseController.getEachExpense);
router.put("/expense/:id", expenseController.editExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

module.exports = router;
