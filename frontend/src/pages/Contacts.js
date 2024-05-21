// src/pages/Contacts.js
import React from 'react';
import './Contacts.css';

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
                <div className="contacts-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.4278970080176!2d74.60597881532758!3d42.874621179155585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec85d947ecb6d%3A0x8d1c2d8e9a9a3d8!2zQmlza2VrLCDQm9GA0LDQu9C10LrRgiDQkNC60YPQu9C10LrRgNC40L3RgdGC0YDRgtC40L3QutCw!5e0!3m2!1sen!2skg!4v1652298320577!5m2!1sen!2skg"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
