import Expense from "../models/Expense.js";
import mongoose from "mongoose"


// Controller functions
export const fetchExpenses = async (req, res) => {
        try {
            const expenses = await Expense.find();
            res.json(expenses);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

   export const createExpense = async (req, res) => {
        const { date, amount, category, description } = req.body;

        try {
            const newExpense = new Expense({
                date,
                amount,
                category,
                description
            });

            await newExpense.save();
            res.status(201).json(newExpense);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // export const updateExpense = async (req, res) => {
    //     const { id } = req.params;
    //     const { date, amount, category, description } = req.body;

    //     if (!mongoose.Types.ObjectId.isValid(id)) {
    //         return res.status(404).json({ message: 'Expense not found' });
    //     }   

    //     const updatedExpense = { date, amount, category, description, _id: id };

    //     await Expense.findByIdAndUpdate(id, updatedExpense, { new: true });
    //     res.json(updatedExpense);
    // }

    export const updateExpense = async (req, res) => {
        try {
            const { id } = req.params;
            const { date, amount, category, description } = req.body;
            const userId = req.user.id; // Assuming you have middleware that sets req.user
    
            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid expense ID' });
            }
    
            // Validate required fields
            if (!date || !amount || !category || !description) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            // Find the expense and check if it belongs to the user
            const expense = await Expense.findOne({ _id: id, user: userId });
    
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found or you do not have permission to update it' });
            }
    
            // Update the expense
            expense.date = date;
            expense.amount = amount;
            expense.category = category;
            expense.description = description;
    
            const updatedExpense = await expense.save();
    
            res.json(updatedExpense);
        } catch (error) {
            console.error('Error in updateExpense:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };
    

    export const deleteExpense = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedExpense = await Expense.findByIdAndDelete(id);
            if (!deletedExpense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            res.json({ message: 'Expense deleted successfully', deletedExpense });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }





// export const createExpense = async (req, res) => {
//     const { date, amount, category, description } = req.body;
//     try {
//         const newExpense = new Expense({
//             user: req.user,
//             date,
//             amount,
//             category,
//             description
//         });
//         const expense = await newExpense.save();
//         res.json({expense});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }   

// export const fetchExpenses = async (req, res) => {
//     try {
//         const expenses = await Expense.find({ user: req.user._id});
//         res.json({expenses});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }

// export const updateExpense = async (req, res) => {
//     const { id } = req.params;
//     const { date, amount, category, description } = req.body;
//     try {
//         const updatedExpense = await Expense.findByIdAndUpdate(id, {
//             date,
//             amount,
//             category,
//             description
//         }, { new: true });
//         res.json({updatedExpense});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }   

// export const deleteExpense = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Expense.findByIdAndDelete(id);
//         res.json({ msg: 'Expense deleted successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }