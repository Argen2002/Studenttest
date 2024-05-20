// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = () => {
        axios.post('http://127.0.0.1:8000/api/users/register/', {
            username,
            email,
            password
        })
        .then(response => {
            setMessage('Registration successful. Please log in.');
        })
        .catch(error => {
            setMessage('Registration failed.');
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
