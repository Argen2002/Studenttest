// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';

import Questionnaire from './components/Questionnaire';
import Result from './pages/Result';

import Register from './pages/Register';
import Login from './pages/Login';

import Footer from './components/Footer';

import UniversityList from './pages/UniversityList';
import UniversityDetail from './pages/UniversityDetail';

import About from './pages/About';
import Contacts from './pages/Contacts';

import axios from 'axios';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="app-container">
                <NavBar handleLogout={handleLogout} token={token} />
                <div className="content-wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setToken={(token) => {
                            setToken(token);
                            localStorage.setItem('token', token);
                        }} />} />
                        <Route path="/questionnaire" element={<Questionnaire />} />
                        <Route path="/result" element={<Result />} />
                        <Route path="/universities" element={<UniversityList />} />
                        <Route path="/universities/:id" element={<UniversityDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contacts/>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
