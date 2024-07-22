import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseChart from '../ExpenseChart';
import STYLE from './Summary.module.css';


function Summary() {
    const [summary, setSummary] = useState({
        total: 0,
        categories: {}
    });

    const fetchSummary = async () => {
        const token = localStorage.getItem('token');

        try{
        const res = await axios.get('http://localhost:4000/api/expenses', {
            headers: {
                'x-auth-token': `${token}`, // Include the token
            }
        });

        if (!Array.isArray(res.data)) {
            throw new Error('Expected an array from API response');
        }

        const total = res.data.reduce((acc, expense) => acc + expense.amount, 0);
        const categories = res.data.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});

        setSummary({ total, categories });
     } catch (error) {
        console.error('Error fetching summary:', error.message);
    }
};


    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <div className={STYLE.summary_container}>
            <h1 className={STYLE.summary_title}>Summary</h1>
            <p className={STYLE.summary_total}>Total Spending: {summary.total}</p>
            <ul className={STYLE.summary_categories}>
                {Object.keys(summary.categories).map(category => (
                    <li key={category} className={STYLE.summary_category}>
                        {category}: {summary.categories[category]}
                    </li>
                ))}
            </ul>
            <ExpenseChart />
        </div>
    );
}

export default Summary;



