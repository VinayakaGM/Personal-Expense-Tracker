import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
    const { date, amount, category, description } = req.body;
    try {
        const newExpense = new Expense({
            user: req.user,
            date,
            amount,
            category,
            description
        });
        const expense = await newExpense.save();
        res.json({expense});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}   

export const fetchExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id});
        res.json({expenses});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { date, amount, category, description } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            date,
            amount,
            category,
            description
        }, { new: true });
        res.json({updatedExpense});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}   

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.json({ msg: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}