import axios from "axios";
import { useEffect, useState } from "react";
import STYLE from "./Expenses.module.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
  });

  const { date, amount, category, description } = formData;

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/expenses", {
      headers: {
        "x-auth-token": token,
      },
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/expenses", formData, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchExpenses();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchExpenses();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className={STYLE.expenses_container}>
      <h className={STYLE.expenses_title}>Expenses</h>
      <form onSubmit={onSubmit} className={STYLE.expenses_form}>
        <div className={STYLE.form_control}>
          <label>Date</label>
          <input type="date" name="date" value={date} onChange={onChange} />
        </div>
        <div className={STYLE.form_control}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
          />
        </div>
        <div className={STYLE.form_control}>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
          />
        </div>
        <div className={STYLE.form_control}>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <button type="submit" className={STYLE.expenses_btn}>Add Expense</button>
      </form>
      <ul className={STYLE.expenses_list}>
        {Array.isArray(expenses) && expenses.map((expense) => (
          <li key={expense._id} className={STYLE.expenses_item}>
            {expense.date} - {expense.amount} - {expense.category} -{" "}
            {expense.description}
            <button onClick={() => onDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
