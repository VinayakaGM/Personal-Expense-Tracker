import express from "express";
import { db } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import expenseRoute from "./routes/expenseRoutes.js";

const app = express();
dotenv.config();
db();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
