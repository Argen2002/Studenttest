import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Подключаем CSS файл

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login/', {
            username,
            password
        })
        .then(response => {
            const token = response.data.access;
            setToken(token);
            localStorage.setItem('token', token);
            setMessage('Login successful.');
            navigate('/'); // Перенаправляем на главную страницу после успешного входа
        })
        .catch(error => {
            setMessage('Login failed.');
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <div className="auth-tab"><a href="/register">Регистрация</a></div>
                <div className="auth-tab active">Вход</div>
            </div>
            <div className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Войти</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Login;
