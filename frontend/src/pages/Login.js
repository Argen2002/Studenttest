// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/users/login/', {
            username,
            password
        })
        .then(response => {
            setToken(response.data.access);
            setMessage('Login successful.');
        })
        .catch(error => {
            setMessage('Login failed.');
            console.error('There was an error logging in!', error);
        });
    };

    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
};

export default Login;
