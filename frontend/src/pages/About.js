import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>О нас</h1>
            </div>
            <div className="about-content">
                <h2>
                    О проекте
                    <span className="highlight"> Профориентация</span>
                </h2>
            </div>
            <div className="about-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.</p>
            </div>
            <div className="about-content-h2">
                <h2>Цели проекта</h2>
             </div>
            <div className="project-goals">
                <ul>
                    <li>Повышение уровня осведомленности молодого поколения о перспективных профессиях.</li>
                    <li>Формирование готовности к совершению осознанного профессионального выбора.</li>
                    <li>Улучшение доступа к востребованным специальностям.</li>
                    <li>Увеличение занятости на отечественном рынке труда.</li>
                    <li>Расширение перспектив обучения и трудоустройства для молодежи страны.</li>
                    <li>Обеспечение социального развития и роста уровня жизни в Кыргызстане.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;
