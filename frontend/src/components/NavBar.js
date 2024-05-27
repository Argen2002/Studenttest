import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import personalAccountIcon from '../assets/account.png';
import burgerIcon from '../assets/menu.png';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                        <Link to="/subject-test">Тесты профессии</Link>
                        <Link to="/result">Результаты</Link>
                    </div>
                </li>
                <li><Link to="/universities">Вузы</Link></li>
                <li><Link to="/about">О нас</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
            </ul>

            <div className="navbar-account">
                <Link to="/profile">
                    <img src={personalAccountIcon} alt="Personal Account" className="icon" />
                </Link>
                <button className="navbar-login-button"><Link to="/login">Войти</Link></button>
            </div>
            <button className="burger-menu" onClick={toggleMenu}>
                <img src={burgerIcon} alt="Menu" className="burger-icon" />
            </button>
        </nav>
    );
};

export default NavBar;
