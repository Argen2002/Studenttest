// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Подключаем CSS файл

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">LOGO</Link>
            <ul className="navbar-links">
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
                <span>Личный кабинет</span>
                <button className="navbar-login-button"><Link to="/login">Войти</Link></button>
            </div>
        </nav>
    );
};

export default NavBar;
