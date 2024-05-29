import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfessionDetail.css';

const ProfessionDetail = () => {
    const { id } = useParams();
    const [profession, setProfession] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/professions/${id}/`)
            .then(response => {
                setProfession(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the profession!', error);
            });
    }, [id]);

    if (!profession) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="profession-detail-container">
            <h2>{profession.name}</h2>
            <img src={profession.image} alt={profession.name} className="profession-image" />
            <p className="profession-category">Категория: {profession.category}</p>
            <p>{profession.description}</p>
        </div>
    );
};

export default ProfessionDetail;
