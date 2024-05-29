import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        files.forEach(file => formData.append('files', file));

        axios.post('http://127.0.0.1:8000/api/contact/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setSuccess('Сообщение успешно отправлено!');
            setError(null);
        })
        .catch(error => {
            setError('Ошибка при отправке сообщения.');
            setSuccess(null);
        });
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    return (
        <div className="contact-form-container">
            <h2>Связаться с нами</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя и фамилия</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Электронная почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Сообщение</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Прикрепить файлы</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                        multiple
                    />
                </div>
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
        </div>
    );
};

export default ContactForm;
