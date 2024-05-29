import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaYoutube, FaVk, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2024, Your Website. Все права защищены</p>
                <div className="footer-links">
                    <span>Контакты</span>
                    <span>+996 (999) 99 99 99</span>
                    <span>Справочная *611</span>
                    <span>answer@yourwebsite.com</span>
                </div>
                <div className="footer-social">
                    <FaInstagram className="social-icon" />
                    <FaFacebookF className="social-icon" />
                    <FaYoutube className="social-icon" />
                    <FaVk className="social-icon" />
                    <FaTwitter className="social-icon" />
                    <FaWhatsapp className="social-icon" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
