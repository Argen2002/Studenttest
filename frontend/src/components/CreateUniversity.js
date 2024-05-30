import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateUniversity.css';

const CreateUniversity = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [address, setAddress] = useState('');
    const [languageOfInstruction, setLanguageOfInstruction] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [image, setImage] = useState(null);
    const [contract, setContract] = useState('');
    const [scholarship, setScholarship] = useState('');
    const [budget, setBudget] = useState('Отсутствует');
    const [missionAndGoals, setMissionAndGoals] = useState('');
    const [thresholdOrt, setThresholdOrt] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Добавляем useNavigate

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/current-user/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });

        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });

        axios.get('http://127.0.0.1:8000/api/professions/')
            .then(response => {
                setProfessions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the professions!', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('address', address);
        formData.append('language_of_instruction', languageOfInstruction);
        formData.append('email', email);
        formData.append('contact_number', contactNumber);
        formData.append('website', website);
        if (image) {
            formData.append('image', image);
        }
        formData.append('contract', contract);
        formData.append('scholarship', scholarship);
        formData.append('budget', budget);
        formData.append('mission_and_goals', missionAndGoals);
        formData.append('threshold_ort', thresholdOrt);
        selectedCategories.forEach(category => {
            formData.append('categories', category);
        });
        selectedProfessions.forEach(profession => {
            formData.append('professions', profession);
        });

        axios.post('http://127.0.0.1:8000/api/universities/create/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log('University created successfully:', response.data);
            navigate('/universities'); // Перенаправляем пользователя на страницу /universities
        })
        .catch(error => {
            console.error('There was an error creating the university!', error);
            setError(error.response.data);
        });
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
    };

    const handleProfessionChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedProfessions(selectedOptions);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (!user.can_add_university) {
        return <div>У вас нет прав для добавления ВУЗов.</div>;
    }

    return (
        <div className="create-university-container">
            <h2>Добавить ВУЗ</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Рейтинг</label>
                    <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Миссия и цели</label>
                    <textarea
                        value={missionAndGoals}
                        onChange={(e) => setMissionAndGoals(e.target.value)}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Язык обучения</label>
                    <input
                        type="text"
                        value={languageOfInstruction}
                        onChange={(e) => setLanguageOfInstruction(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Контактный номер</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Веб-сайт</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Контракт</label>
                    <input
                        type="number"
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Стипендия</label>
                    <input
                        type="number"
                        value={scholarship}
                        onChange={(e) => setScholarship(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Адрес</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Пароговый орт на поступление</label>
                    <input
                        type="number"
                        value={thresholdOrt}
                        onChange={(e) => setThresholdOrt(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Фото</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Бюджет</label>
                    <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="form-control"
                    >
                        <option value="Присутствует">Присутствует</option>
                        <option value="Отсутствует">Отсутствует</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Категории</label>
                    <select
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        className="form-control"
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Профессии</label>
                    <select
                        multiple
                        value={selectedProfessions}
                        onChange={handleProfessionChange}
                        className="form-control"
                    >
                        {professions.map(profession => (
                            <option key={profession.id} value={profession.id}>
                                {profession.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Удерживайте клавишу "Control" или "Command" на Mac, чтобы выбрать несколько.</p>
                </div>
                {error && <div className="error-message">Ошибка: {JSON.stringify(error)}</div>}
                <button type="submit" className="btn btn-primary">Добавить ВУЗ</button>
            </form>
        </div>
    );
};

export default CreateUniversity;
