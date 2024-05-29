import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/questions/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the questions!', error);
        });
    }, [token]);

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerId
        }));
    };

    const handleSubmit = () => {
        const userAnswers = Object.keys(answers).map(questionId => ({
            question: parseInt(questionId, 10),
            answer: parseInt(answers[questionId], 10)
        }));

        console.log('Submitting answers:', userAnswers);

        axios.post('http://127.0.0.1:8000/api/user-answers/', userAnswers, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            navigate('/result');
        })
        .catch(error => {
            console.error('There was an error submitting the answers!', error.response.data);
        });
    };

    return (
        <div className="questionnaire-container">
            <h2>Тест для определения профессиональных предпочтений</h2>
            {questions.map(question => (
                <div key={question.id} className="question">
                    <h4>{question.text}</h4>
                    <div className="answers">
                        {question.answers.map(answer => (
                            <div key={answer.id} className="answer">
                                <input
                                    type="radio"
                                    id={`answer-${answer.id}`}
                                    name={`question-${question.id}`}
                                    value={answer.id}
                                    onChange={() => handleAnswerChange(question.id, answer.id)}
                                />
                                <label htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="submit-section">
                <button onClick={handleSubmit}>Отправить</button>
            </div>
        </div>
    );
};

export default Questionnaire;
