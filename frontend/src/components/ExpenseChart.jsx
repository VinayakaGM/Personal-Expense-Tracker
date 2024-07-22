import { Chart as ChartJS } from 'chart.js/auto'; // Import 'auto' version for Chart.js v3
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import STYLE from './ExpenseChart.module.css';

const ExpenseChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Expenses by Category',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/api/expenses', {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                const data = res.data;

                // Prepare chart data
                const categories = {};
                data.forEach((expense) => {
                    if (!categories[expense.category]) {
                        categories[expense.category] = 0;
                    }
                    categories[expense.category] += expense.amount;
                });

                const chartLabels = Object.keys(categories);
                const chartValues = Object.values(categories);

                setChartData({
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Total Expenses by Category',
                            data: chartValues,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                            ],
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching expense data:', err.message);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchExpenseData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={STYLE.expense_chart_container}>
            <h2 className={STYLE.expense_chart_title}>Expense Chart</h2>
            <div style={{ height: '400px', width: '600px' }} className={STYLE.expense_chart}>
                <Bar
                    className={STYLE.expense_chart_bar}
                    data={chartData}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                type: 'linear', // Ensure 'linear' type is correctly defined
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ExpenseChart;
