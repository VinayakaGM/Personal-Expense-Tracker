
import { Link } from 'react-router-dom';
import STYLE from './WelcomePage.module.css';

const WelcomePage = () => {
    return (
        <div className={STYLE.welcome_container}>
            <header className={STYLE.welcome_header}>
                <h1>Welcome to Your Personal Expense Tracker</h1>
                <p>Manage your expenses efficiently and effectively.</p>
            </header>
            <div className={STYLE.welcome_content}>
                <div className={STYLE.welcome_card}>
                    <h2>Track Expenses</h2>
                    <p>Keep track of all your expenses in one place.</p>
                    <Link to="/expenses" className={STYLE.welcome_button}>Get Started</Link>
                </div>
                <div className={STYLE.welcome_card}>
                    <h2>View Summary</h2>
                    <p>Analyze your spending habits over time.</p>
                    <Link to="/summary" className={STYLE.welcome_button}>View Summary</Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
