import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import personalAccountIcon from '../assets/account.png';
import burgerIcon from '../assets/menu.png';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('There was an error fetching the user info!', error);
                setUser(null);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="/Argo.png" alt="Logo" className="logo" />
            </Link>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/">Главная</Link></li>
                <li className="dropdown">
                    <span className="dropdown-title">Тесты</span>
                    <div className="dropdown-content">
                        <Link to="/questionnaire">Тесты</Link>
                        <Link to="/professions">Профессии</Link>
                        <Link to="/result">Результаты</Link>
                    </div>
                </li>
                <li><Link to="/universities">Вузы</Link></li>
                <li><Link to="/about">О нас</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
                {user && user.can_add_university && (
                    <li><Link to="/universities/create">Добавить ВУЗ</Link></li>
                )}
            </ul>

            <div className="navbar-account">
                <Link to="/profile">
                    <img src={personalAccountIcon} alt="Personal Account" className="icon" />
                </Link>
                {user ? (
                    <button className="navbar-login-button" onClick={handleLogout}>Выйти</button>
                ) : (
                    <button className="navbar-login-button"><Link to="/login">Войти</Link></button>
                )}
            </div>
            <button className="burger-menu" onClick={toggleMenu}>
                <img src={burgerIcon} alt="Menu" className="burger-icon" />
            </button>
        </nav>
    );
};

export default NavBar;
