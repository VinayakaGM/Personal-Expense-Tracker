import axios from "axios";
import { useEffect, useState } from "react";
import STYLE from "./Expenses.module.css";
import {toast, ToastContainer } from 'react-toastify';


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState([
    "Food",
    "Transportation",
    "Entertainment",
  ]);
  const [editingId, setEditingId] = useState(null);

  const { date, amount, category, description } = formData;

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:4000/api/expenses", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (!Array.isArray(res.data)) {
        throw new Error("API did not return an array of expenses");
      }
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" && value && !categories.includes(value)) {
      setCategories([...categories, value]);
    }
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ date: "", amount: "", category: "", description: "" });
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!date || !amount || !category || !description) {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
      return;
    }
    const token = localStorage.getItem("token");
    try {
      let response;
      if (editingId) {
        response = await axios.put(
          `http://localhost:4000/api/expenses/${editingId}`,
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:4000/api/expenses",
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
      }
      console.log("Server response:", response);
      fetchExpenses();
      resetForm();
      toast.success("Expense added successfully!", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      console.error("Error adding/updating expense:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Error request:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", err.message);
      }
    }
  };
  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:4000/api/expenses/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchExpenses();
      toast.success("Expense deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      console.error("Error deleting expense:", err.message);
    }
  };

  const onEdit = (expense) => {
    setFormData({
      date: expense.date.split("T")[0], 
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
    setEditingId(expense._id);

  };

  return (
    <div className={STYLE.expenses_container}>
      <form onSubmit={onSubmit} className={STYLE.expenses_form}>
        <h2 className={STYLE.expenses_title}>Add Expenses</h2>
        <div className={STYLE.form_control}>
          <label className={STYLE.date_label}>Date</label>
          <input
            className={STYLE.date_input}
            type="date"
            name="date"
            value={date}
            onChange={onChange}
          />
        </div>
        <div className={STYLE.form_control}>
          <label className={STYLE.amount_label}>Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            className={STYLE.amount_input}
          />
        </div>
        <div className={STYLE.form_control}>
          <label className={STYLE.category_label}>Category</label>
          <input
            list="category-list"
            name="category"
            value={category}
            onChange={onChange}
            className={STYLE.category_input}
          />
          <datalist id="category-list" className={STYLE.category_list}>
            {categories.map((cat, index) => (
              <option key={index} value={cat} className={STYLE.category_option}>
                {cat}
              </option>
            ))}
          </datalist>
        </div>
        <div className={STYLE.form_control}>
          <label className={STYLE.description_label}>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
            className={STYLE.description_input}
          />
        </div>
        <button type="submit" className={STYLE.expenses_btn}>
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className={STYLE.expenses_btn_cancel}
          >
            Cancel Edit
          </button>
        )}
      </form>

     { expenses.length > 0 && <div className={STYLE.expenses_list}>
        <h2 className={STYLE.expenses_list_title}>Track Expenses</h2>
        <div className={STYLE.expenses_header}>
          <p>Date</p>
          <p>Amount</p>
          <p>Category</p>
          <p>Description</p>
        </div>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id} className={STYLE.expenses_item}>
              <div className={STYLE.expenses_item_content}>
                <p>{expense.date.split("T")[0]}</p>
                <p>{expense.amount}</p>
                <p>{expense.category}</p>
                <p>{expense.description}</p>
              </div>
              <div className={STYLE.expenses_item_actions}>
                <button
                  onClick={() => onDelete(expense._id)}
                  className={`${STYLE.expenses_list_btn} ${STYLE.expenses_list_delete}`}
                >
                  Delete
                </button>
                <button
                  onClick={() => onEdit(expense)}
                  className={`${STYLE.expenses_list_btn} ${STYLE.expenses_list_edit}`}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>}
      <ToastContainer/>
    </div>
  );
};

export default Expenses;
