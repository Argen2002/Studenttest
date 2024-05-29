import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Подключаем CSS файл
import heroImage from '../assets/hero.svg';
import AboutImage from '../assets/about.svg';
import ctaImage from '../assets/test.svg';
import {Link} from "react-router-dom";

const Home = () => {
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/universities/')
            .then(response => {
                setUniversities(response.data.slice(0, 4)); // Get only the first 4 universities
            })
            .catch(error => {
                console.error('There was an error fetching the universities!', error);
            });
    }, []);

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-text">
                    <h1>Добро пожаловать в систему поддержки принятия решений для студентов</h1>
                    <p>Это приложение помогает студентам принимать взвешенные решения, основываясь на их предпочтениях и учебных целях.</p>
                    <Link to="/questionnaire" className="primary-button">Перейти в тест</Link>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Hero" />
                </div>
            </div>
            <div className="about-section">
                <h2>О проекте</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit.Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit.</p>
                        <button className="primary-button">Подробнее</button>
                    </div>
                    <div className="about-image">
                        <img src={AboutImage} alt="About" />
                    </div>
                </div>
            </div>
            <div className="cta-section">
                <div className="cta-text">
                    <h2>Не можете сделать выбор ВУЗа?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link to="/questionnaire" className="primary-button">Перейти в тест</Link>
                </div>
                <div className="cta-image">
                    <img src={ctaImage} alt="CTA" />
                </div>
            </div>
            <div className="universities-section">
                <div className="universities-header">
                    <h2>ВУЗы Кыргызстана</h2>
                    <Link to="/universities">Все ВУЗы</Link>
                </div>
                <div className="universities-grid">
                    {universities.map(university => (
                        <div key={university.id} className="university-card">
                          <Link to={`/universities/${university.id}`}>
                            <img src={university.image} alt={university.name} className="university-image" />
                            <div className="university-info">
                                <h3>{university.name}</h3>
                                <p>{university.address}</p>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
