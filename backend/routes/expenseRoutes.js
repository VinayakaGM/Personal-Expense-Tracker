import express from "express";
// import {
//   createExpense,
//   deleteExpense,
//   fetchExpenses,
//   updateExpense,
// } from "../controllers/expenseController.js";
import {createExpense, fetchExpenses,deleteExpense,updateExpense } from "../controllers/expenseController.js";
import { auth } from "../middlewares/auth.js";
const expenseRoute = express.Router();

expenseRoute.post("/", auth, createExpense);
expenseRoute.get("/", auth, fetchExpenses);
expenseRoute.put("/:id", auth, updateExpense);
expenseRoute.delete("/:id", auth, deleteExpense);

export default expenseRoute;
