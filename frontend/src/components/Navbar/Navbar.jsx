import { Link, useNavigate } from 'react-router-dom';
import STYLE from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <nav className={STYLE.navbar}>
            <div className={STYLE.navbar_container}>
                <Link to="/" className={STYLE.navbar_logo}>
                    Expense Tracker
                </Link>
                <ul className={STYLE.navbar_menu}>
                    {isAuthenticated ? (
                        <>
                            <li className={STYLE.navbar_item}>
                                <Link to="/" className={STYLE.navbar_link}>
                                    Home
                                </Link>
                            </li>
                            <li className={STYLE.navbar_item}>
                                <Link to="/expenses" className={STYLE.navbar_link}>
                                    Add Expense
                                </Link>
                            </li>
                            <li className={STYLE.navbar_item}>
                                <Link to="/summary" className={STYLE.navbar_link}>
                                    View Summary
                                </Link>
                            </li>
                            <li className={STYLE.navbar_item}>
                                <button onClick={handleLogout} className={STYLE.navbar_link}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={STYLE.navbar_item}>
                                <Link to="/register" className={STYLE.navbar_link}>
                                    Register
                                </Link>
                            </li>
                            <li className={STYLE.navbar_item}>
                                <Link to="/login" className={STYLE.navbar_link}>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

