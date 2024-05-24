// src/pages/Result.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Result.css';

const Result = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [subjectPoints, setSubjectPoints] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/test-result/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setResult(response.data);
        })
        .catch(error => {
            setError(error.response.data);
        });

        axios.get('http://127.0.0.1:8000/api/subject-test-result/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setSubjectPoints(response.data.subject_points);
        })
        .catch(error => {
            console.error(error);
        });

    }, [token]);

    if (error) {
        return <div className="error-message">Error: {error.detail}</div>;
    }

    if (!result) {
        return <div className="loading-message">Loading...</div>;
    }

    const topCategory = Object.keys(result.results).reduce((a, b) => result.results[a] > result.results[b] ? a : b);
    const highestCategory = Object.keys(result.results).reduce((a, b) => result.results[a] > result.results[b] ? a : b);

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    return (
        <div className="result-container">
            <div className="result-header">
                <h2>Ваши результаты теста</h2>
                <p>Ваши результаты:</p>
            </div>
            <div className="result-details">
                <table className="result-table">
                    <thead>
                        <tr>
                            <th>Система</th>
                            <th>Уровень соответствия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(result.results).map(category => (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress-bar-fill" style={{ width: `${result.results[category]}%` }}>
                                            {result.results[category]}%
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {result.descriptions && result.descriptions[topCategory] && (
                <div className="category-description">
                    <h3>Рекомендуемая категория: {topCategory}</h3>
                    <p>{result.descriptions[topCategory]}</p>
                </div>
            )}
            {result.professions && result.professions[highestCategory] && (
                <div className="result-professions">
                    <h3>Рекомендуемые профессии для категории: {highestCategory}</h3>
                    <ul>
                        {result.professions[highestCategory].map(profession => (
                            <li key={profession}>{profession}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="subject-test-result">
                <h3>Ваши баллы за тесты на предметы:</h3>
                <ul>
                    {Object.keys(subjectPoints).map(subject => (
                        <li key={subject}>{subject}: {subjectPoints[subject]} баллов</li>
                    ))}
                </ul>
            </div>
            <div className="subject-selection">
                <h3>Выберите предмет для теста:</h3>
                <select value={selectedSubject} onChange={handleSubjectChange}>
                    <option value="">Выберите предмет</option>
                    {result.subjects && result.subjects[highestCategory] && result.subjects[highestCategory].map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>
            {selectedSubject && (
                <div className="subject-test-link">
                    <p>Хотите пройти тест на предмет "{selectedSubject}"?</p>
                    <Link to={`/subject-test/${selectedSubject}`}>Пройти тест на предмет</Link>
                </div>
            )}
            {result.recommended_universities && (
                <div className="recommended-universities">
                    <h3>Рекомендуемые ВУЗы:</h3>
                    <ul>
                        {result.recommended_universities.map(university => (
                            <li key={university.id}>
                                <h4>{university.name}</h4>
                                <p>{university.description}</p>
                                <p>Рейтинг: {university.rating}</p>
                                <p>Адрес: {university.address}</p>
                                <p>Язык обучения: {university.language_of_instruction}</p>
                                <p>Контактный телефон: {university.contact_number}</p>
                                <p>Электронная почта: {university.email}</p>
                                <a href={university.website} target="_blank" rel="noopener noreferrer">Веб-сайт</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Result;
