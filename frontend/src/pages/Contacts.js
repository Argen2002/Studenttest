import React from 'react';
import './Contacts.css';
import ContactForm from '../pages/ContactForm';

const Contacts = () => {
    return (
        <div className="contacts-container">
            <h2>Контакты</h2>
            <div className="contacts-content">
                <div className="contacts-info">
                    <p><strong>Адрес:</strong> Бишкек, Кыргызстан</p>
                    <p><strong>Телефон:</strong> +996 (999) 99 99 99</p>
                    <p><strong>Email:</strong> info@example.com</p>
                    <p><strong>Режим работы:</strong> Пн-Пт, 9:00 - 18:00</p>
                </div>
                <ContactForm /> {/* Добавляем форму обратной связи */}
            </div>
        </div>
    );
};

export default Contacts;
