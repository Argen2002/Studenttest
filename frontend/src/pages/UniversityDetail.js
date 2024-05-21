// src/components/UniversityDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UniversityDetail.css';
import addressIcon from '../assets/address.png';
import languageIcon from '../assets/language.png';
import contactIcon from '../assets/contact.png';
import ratingIcon from '../assets/rating.png';
import emailIcon from '../assets/iemail.png';
import websiteIcon from '../assets/web.png';

const UniversityDetail = () => {
    const { id } = useParams();
    const [university, setUniversity] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/universities/${id}/`)
            .then(response => {
                setUniversity(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the university!', error);
            });
    }, [id]);

    if (!university) {
        return <div>Loading...</div>;
    }

     return (
        <div className="university-detail">
            <h2>{university.name}</h2>
            <div className="university-content">
                <p className="university-description">{university.description}</p>
                <img src={university.image} alt={university.name} className="university-image" />
            </div>
            <div className="university-info-grid">
                <div className="university-info-item">
                    <img src={addressIcon} alt="Address" className="icon" />
                    <div>
                        <strong>Адрес</strong>
                        <p>{university.address}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={ratingIcon} alt="Rating" className="icon" />
                    <div>
                        <strong>Рейтинг</strong>
                        <p>{university.rating}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={languageIcon} alt="Language" className="icon" />
                    <div>
                        <strong>Язык обучения</strong>
                        <p>{university.language_of_instruction}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={contactIcon} alt="Contact" className="icon" />
                    <div>
                        <strong>Контактный номер</strong>
                        <p>{university.contact_number}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={emailIcon} alt="Email" className="icon" />
                    <div>
                        <strong>Email</strong>
                        <p>{university.email}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={websiteIcon} alt="Website" className="icon" />
                    <div>
                        <strong>Веб-сайт</strong>
                        <p><a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityDetail;
