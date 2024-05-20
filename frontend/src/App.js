// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Questionnaire from './components/Questionnaire';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import Result from './pages/Result';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  return (
    <Router>
      <div id="page-container">
        <NavBar /> {/* Верхняя навигационная панель */}
        <div id="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
        <Footer /> {/* Добавляем Footer внизу */}
      </div>
    </Router>
  );
};

export default App;
