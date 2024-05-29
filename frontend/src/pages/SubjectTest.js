import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SubjectTest.css';

const SubjectTest = () => {
    const { subject } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/subject-questions/${subject}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            setMessage('There was an error fetching the questions.');
        });
    }, [subject, token]);

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

        axios.post('http://127.0.0.1:8000/api/user-subject-answers/', userAnswers, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setMessage('Test submitted successfully.');
            navigate('/result');
        })
        .catch(error => {
            setMessage('There was an error submitting the answers.');
        });
    };

    return (
        <div className="subject-test-container">
            <h2>Тест по предмету: {subject}</h2>
            {message && <p className="message">{message}</p>}
            {questions.map(question => (
                <div key={question.id} className="question">
                    <h4>{question.text}</h4>
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
            ))}
            <button className="submit-button" onClick={handleSubmit}>Отправить</button>
        </div>
    );
};

export default SubjectTest;
