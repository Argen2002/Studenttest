import React, { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import './UniversityList.css';

const UniversityList = () => {
    const [universities, setUniversities] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchUniversities = async () => {
            const params = new URLSearchParams(location.search);
            const searchQuery = params.get('search') || '';
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/universities/', {
                    params: { search: searchQuery }
                });
                setUniversities(response.data);
            } catch (error) {
                console.error('There was an error fetching the universities!', error);
            }
        };
        fetchUniversities();
    }, [location.search]);

     return (
        <div className="university-list">
            <h2>Все ВУЗы Кыргызстана</h2>
            <input type="text" placeholder="Поиск" className="search-bar" onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        window.location.href = `/universities?search=${e.target.value}`;
                    }
                }} />
            <div className="university-grid">
                {universities.map(university => (
                    <div key={university.id} className="university-card">
                        <Link to={`/universities/${university.id}`}>
                            <img src={university.image} alt={university.name} className="university-image" />
                            <div className="university-info">
                                <h3>{university.name}</h3>
                                <p>{university.address}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniversityList;
