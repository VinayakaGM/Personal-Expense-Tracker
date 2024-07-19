import { useState, useEffect } from 'react';
import axios from 'axios';
import STYLE from './Summary.module.css';

const Summary = () => {
    const [summary, setSummary] = useState({
        total: 0,
        categories: {}
    });

    const fetchSummary = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/expenses', {
            headers: {
                'x-auth-token': token
            }
        });

        const total = res.data.reduce((acc, expense) => acc + expense.amount, 0);
        const categories = res.data.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});

        setSummary({ total, categories });
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
        </div>
    );
}

export default Summary;
