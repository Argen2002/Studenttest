import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfessionList.css';

const ProfessionList = () => {
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/professions/')
            .then(response => {
                setProfessions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the professions!', error);
            });
    }, []);

    const truncateDescription = (description) => {
        if (!description) {
            return '';
        }
        if (description.length > 100) {
            return description.substring(0, 100) + '...';
        }
        return description;
    };

    return (
        <div className="profession-list-container">
            <h2>Список Профессий</h2>
            <div className="profession-grid">
                {professions.map(profession => (
                    <div key={profession.id} className="profession-card">
                        <Link to={`/professions/${profession.id}`}>
                            <img src={profession.image} alt={profession.name} className="profession-image" />
                            <div className="profession-info">
                                <h3>{profession.name}</h3>
                                <p>{truncateDescription(profession.description)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfessionList;
