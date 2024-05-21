// src/pages/Result.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Result.css';

const Result = () => {
    const [resultData, setResultData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/test-result/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setResultData(response.data);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }, [token]);

    if (error) {
        return <div className="error-message">Error: {error.detail}</div>;
    }

    if (!resultData) {
        return <div className="loading-message">Loading...</div>;
    }

    const { results, descriptions } = resultData;

    return (
        <div className="result-container">
            <div className="result-header">
                <h2>Тест для определения профессиональных предпочтений</h2>
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
                        {Object.keys(results).map(category => (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress-bar-fill" style={{ width: `${results[category]}%` }}>
                                            {results[category]}%
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="category-descriptions">
                {Object.keys(descriptions).map(category => (
                    <div key={category} className="category-card">
                        <h3>{category}</h3>
                        <p>{descriptions[category]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
