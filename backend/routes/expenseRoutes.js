import express from "express";
const expenseRoute = express.Router();

expenseRoute.post("/", createExpense);
expenseRoute.get("/", fetchExpenses);
expenseRoute.put("/:id", updateExpense);
expenseRoute.delete("/:id", deleteExpense);

export default expenseRoute;
