import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UniversityDetail.css';
import addressIcon from '../assets/address.png';
import languageIcon from '../assets/language.png';
import contactIcon from '../assets/contact.png';
import ratingIcon from '../assets/rating.png';
import emailIcon from '../assets/iemail.png';
import websiteIcon from '../assets/web.png';
import contractIcon from '../assets/contract.png';
import scholarshipIcon from '../assets/scholarship.png';
import budgetIcon from '../assets/budget.png';
import thresholdIcon from '../assets/checked-checkbox.png';

const UniversityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [university, setUniversity] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/universities/${id}/`)
            .then(response => {
                setUniversity(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the university!', error);
                setError('Ошибка при загрузке данных.');
            });
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm("Вы точно хотите удалить?");
        if (confirmDelete) {
            axios.delete(`http://127.0.0.1:8000/api/universities/${id}/`)
                .then(response => {
                    console.log('University deleted successfully:', response.data);
                    navigate('/universities');
                })
                .catch(error => {
                    console.error('There was an error deleting the university!', error);
                    setError('Ошибка при удалении ВУЗа.');
                });
        }
    };

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
                <div className="university-info-item">
                    <img src={contractIcon} alt="Contract" className="icon" />
                    <div>
                        <strong>Контракт</strong>
                        <p>{university.contract} сом</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={scholarshipIcon} alt="Scholarship" className="icon" />
                    <div>
                        <strong>Стипендия</strong>
                        <p>{university.scholarship} орт</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={budgetIcon} alt="Budget" className="icon" />
                    <div>
                        <strong>Бюджет</strong>
                        <p>{university.budget}</p>
                    </div>
                </div>
                <div className="university-info-item">
                    <img src={thresholdIcon} alt="Threshold" className="icon" />
                    <div>
                        <strong>Пороговый ОРТ</strong>
                        <p>{university.threshold_ort}</p>
                    </div>
                </div>
            </div>

            <div className="university-content">
                <h2 className="university-mission-h2">Миссия и цели</h2>
            </div>
            <div className="university-content">
                <p className="university-mission">{university.mission_and_goals}</p>
            </div>

            <div className="university-actions">
                <button className="btn btn-primary" onClick={() => navigate(`/universities/edit/${id}`)}>Редактировать</button>
                <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default UniversityDetail;
