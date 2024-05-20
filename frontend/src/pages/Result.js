// src/pages/Result.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Result = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tests/test-result/')
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the test result!', error);
            });
    }, []);

    if (!result) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Test Result</h2>
            <ul>
                {Object.keys(result).map(category => (
                    <li key={category}>
                        {category}: {result[category]}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Result;
