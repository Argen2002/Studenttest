// src/pages/UserProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setProfile(response.data);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }, [token]);

    const handleShowModal = (result) => {
        setSelectedResult(result);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedResult(null);
        setShowModal(false);
    };

    if (error) {
        return <div className="error-message">Error: {error.detail}</div>;
    }

    if (!profile) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="user-profile-container">
            <h2>Личный кабинет</h2>
            <div className="profile-section">
                <h3>Тип личности: {profile.personality_type}</h3>
            </div>
            <div className="profile-section">
                <h3>Последние три результата</h3>
                <ul>
                    {profile.last_three_results.map((result, index) => (
                        <li key={index}>
                            <Button variant="link" onClick={() => handleShowModal(result)}>
                                Результат {index + 1}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h3>Пройденные тесты на предметы</h3>
                <ul>
                    {profile.subject_tests.map(subject => (
                        <li key={subject}>{subject}</li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h3>Баллы за предметы</h3>
                <ul>
                    {Object.keys(profile.subject_points).map(subject => (
                        <li key={subject}>{subject}: {profile.subject_points[subject]} баллов</li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h3>Рекомендованные ВУЗы</h3>
                <ul>
                    {profile.recommended_universities.map(university => (
                        <li key={university.id}>
                            <h4>{university.name}</h4>
                            <p>{university.description}</p>
                            <p>Рейтинг: {university.rating}</p>
                            <p>Адрес: {university.address}</p>
                            <p>Язык обучения: {university.language_of_instruction}</p>
                            <p>Контакты: {university.contact_number}, {university.email}</p>
                            <p>Вебсайт: <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></p>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Детали результата</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResult && (
                        <>
                            <p><strong>Тип личности:</strong> {profile.personality_type}</p>
                            <h5>Рекомендованные ВУЗы:</h5>
                            <ul>
                                {profile.recommended_universities.map(university => (
                                    <li key={university.id}>
                                        <h5>{university.name}</h5>
                                        <p>{university.description}</p>
                                        <p><strong>Рейтинг:</strong> {university.rating}</p>
                                        <p><strong>Адрес:</strong> {university.address}</p>
                                        <p><strong>Язык обучения:</strong> {university.language_of_instruction}</p>
                                        <p><strong>Контакты:</strong> {university.contact_number}, {university.email}</p>
                                        <p><strong>Вебсайт:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></p>
                                    </li>
                                ))}
                            </ul>
                            <h4>Баллы за тесты на предметы:</h4>
                            <ul>
                                {Object.keys(profile.subject_points).map(subject => (
                                    <li key={subject}>{subject}: {profile.subject_points[subject]} баллов</li>
                                ))}
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserProfile;
